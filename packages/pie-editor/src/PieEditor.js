// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Pie } from '@seine/pie';
import type { BlockEditor, PieElement, PieProps } from '@seine/core';
import { UPDATE_BLOCK_BODY, useSelectableBlockProps } from '@seine/core';

import type { Action } from './reducer';
import reduce from './reducer';
import PieSliceEditor from './PieSliceEditor';

type Props = BlockEditor & {
  id: string,
  dispatch: Function,
  edit: boolean,
} & PieProps;

const Container = styled.div`
  position: relative;
  border: ${({ id, selection }) =>
    selection.includes(id) ? '1px dashed blue' : '1px solid transparent'};
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 999;
  ${({ width, height }) =>
    width && height
      ? css`
          height: ${height}px;
          width: ${width}px;
        `
      : css`
          width: 100%;
          height: 100%;
        `}
`;

/**
 * @description Pie editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieEditor({
  id,
  selection,
  dispatch,
  elements,
  fontColor = 'white',
  fontSize = 18,
  padding = 20,
  size = 360,
  ...containerProps
}: Props) {
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  const dispatchPie = React.useCallback(
    (action: Action) =>
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: { elements: reduce(elements, action) },
      }),
    [dispatch, elements]
  );

  const { current: overlay } = overlayRef;
  const angleRef = React.useRef();

  return (
    <Container
      {...useSelectableBlockProps({ id, selection }, dispatch)}
      {...containerProps}
    >
      <Overlay ref={overlayRef} />
      {selection.length === 1 && selection[0] === id ? (
        <svg viewBox={`0 0 ${size} ${size}`}>
          {elements.map(({ title, percent, color }: PieElement, index) => {
            const step = parseInt((percent * size) / 100);
            const angle = index === 0 ? 0 : angleRef.current;
            angleRef.current = angle + step;
            return (
              <PieSliceEditor
                key={index}
                title={title}
                color={color}
                index={index}
                fontSize={fontSize}
                fontColor={fontColor}
                padding={padding}
                percent={percent}
                size={size}
                angle={angle}
                step={step}
                dispatch={dispatchPie}
                overlay={overlay}
              />
            );
          })}
        </svg>
      ) : (
        <Pie
          elements={elements}
          fontSize={fontSize}
          fontColor={fontColor}
          padding={padding}
          size={size}
        />
      )}
    </Container>
  );
}
