// @flow
import * as React from 'react';
import styled from 'styled-components';
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
  width: 100%;
  height: 100%;
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
  const overlay = React.useRef<HTMLDivElement | null>(null);
  const dispatchPie = React.useCallback(
    (action: Action) =>
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: { elements: reduce(elements, action) },
      }),
    [dispatch, elements]
  );

  let angle = 0;
  return (
    <Container
      {...useSelectableBlockProps({ id, selection }, dispatch)}
      {...containerProps}
    >
      <Overlay ref={overlay} />
      {selection.length === 1 && selection[0] === id ? (
        <svg viewBox={`0 0 ${size} ${size}`}>
          {elements.map(({ title, percent, color }: PieElement, index) => {
            const step = (percent * size) / 100;
            angle += step;
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
                angle={angle - step}
                step={step}
                dispatch={dispatchPie}
                overlay={overlay.current}
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
