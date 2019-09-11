// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import type { BlockEditor } from '@seine/core';
import { UPDATE_BLOCK_BODY, useSelectableBlockProps } from '@seine/core';
import { defaultPiePalette, Pie } from '@seine/pie';
import { ActionInput, SVGInput, EditableElement } from '@seine/ui';

import reduce, { UPDATE_PIE_ELEMENT } from './reducer';

type Props = BlockEditor & {
  id: string,
  dispatch: Function,
  edit: boolean,
};

const Container = styled.div`
  position: relative;
  border: ${({ isSelected }) =>
    isSelected ? '1px dashed blue' : '1px solid transparent'};
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  ${({ x, y, width, fontSize, height, maxWidth, maxHeight, size }) =>
    css`
      height: ${height}px;
      left: ${(x * maxWidth) / size}px;
      top: ${(y * maxHeight) / size}px;
      height: ${(height * maxHeight) / size}px;
      width: ${(width * maxWidth) / size}px;
      font-size: ${(fontSize * maxWidth) / size}px;
    `}
`;

const defaultPieEditor = {};

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
  size = 360,
  palette = defaultPiePalette,
  editor: state = defaultPieEditor,
  ...containerProps
}: Props) {
  const isSelected = selection.length === 1 && selection[0] === id;
  const overlayRef = React.useRef(null);
  const dispatchPie = React.useCallback(
    (action: Action) =>
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: { elements: reduce(elements, action) },
      }),
    [dispatch, elements]
  );

  const overlayBox =
    overlayRef.current && overlayRef.current.getBoundingClientRect();

  const fontSize = size / 24;

  return (
    <Container
      {...useSelectableBlockProps({ id, selection }, dispatch)}
      {...containerProps}
    >
      <Overlay ref={overlayRef}>
        {React.useMemo(
          () =>
            overlayBox &&
            isSelected &&
            elements.map(
              ({ title, percent }, index) =>
                index in state && (
                  <InputGroup
                    key={index}
                    {...state[index]}
                    size={size}
                    fontSize={fontSize}
                    maxWidth={overlayBox.width}
                    maxHeight={overlayBox.height}
                  >
                    <SVGInput.Input
                      size={size}
                      as={ActionInput}
                      name={'percent'}
                      value={Math.min(99, Math.max(percent, 1))}
                      action={{ type: UPDATE_PIE_ELEMENT, index }}
                      dispatch={dispatchPie}
                      type={'number'}
                      minvalue={0}
                      maxvalue={100}
                      textAlign={'center'}
                      width={'100%'}
                    />
                    <SVGInput.Input
                      size={size}
                      fontSize={'0.75em'}
                      as={ActionInput}
                      name={'title'}
                      value={title}
                      action={{ type: UPDATE_PIE_ELEMENT, index }}
                      dispatch={dispatchPie}
                      textAlign={'center'}
                      width={'100%'}
                    />
                  </InputGroup>
                )
            ),
          [dispatchPie, elements, fontSize, isSelected, overlayBox, size, state]
        )}
      </Overlay>

      <Pie
        size={size}
        elements={React.useMemo(
          () =>
            isSelected
              ? elements.map((element, index) => ({
                  ...element,
                  as: (props) => (
                    <EditableElement
                      {...props}
                      index={index}
                      dispatch={dispatch}
                    />
                  ),
                }))
              : elements,
          [dispatch, elements, isSelected]
        )}
        palette={palette}
      />
    </Container>
  );
}
