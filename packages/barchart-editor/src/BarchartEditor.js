// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import { UPDATE_BLOCK_BODY, useSelectableBlockProps } from '@seine/core';
import { ActionInput, EditableElement, SVGInput } from '@seine/ui';
import {
  Barchart,
  defaultBarchartFontWeight,
  defaultBarchartLineHeight,
  defaultBarchartPalette,
  defaultBarchartSize,
} from '@seine/barchart';

import reduce, { UPDATE_BAR_CHART_ELEMENT } from './reducer';

type Props = {
  id: string,
  dispatch: Function,
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
  flex-direction: row;
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

const defaultBarchartEditor = {};

/**
 * @description Pie editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarchartEditor({
  id,
  selection,
  dispatch,
  elements,
  size = defaultBarchartSize,
  fontWeight = defaultBarchartFontWeight,
  lineHeight = defaultBarchartLineHeight,
  palette = defaultBarchartPalette,
  editor: state = defaultBarchartEditor,
  ...containerProps
}: Props) {
  const overlayRef = React.useRef<React.Element<typeof Overlay>>(null);

  const dispatchBarchart = React.useCallback(
    (action: Action) =>
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: { elements: reduce(elements, action) },
      }),
    [dispatch, elements]
  );

  const isSelected = selection.length === 1 && selection[0] === id;

  const overlayBox =
    overlayRef.current && overlayRef.current.getBoundingClientRect();

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
              ({ title, value }, index) =>
                index in state && (
                  <InputGroup
                    key={index}
                    {...state[index]}
                    size={size}
                    fontSize={2}
                    maxWidth={overlayBox.width}
                    maxHeight={overlayBox.height}
                    style={{ justifyContent: 'even' }}
                  >
                    <SVGInput.Input
                      fontSize={'1em'}
                      as={ActionInput}
                      name={'title'}
                      value={title}
                      action={{ type: UPDATE_BAR_CHART_ELEMENT, index }}
                      dispatch={dispatchBarchart}
                    />
                    <SVGInput.Input
                      fontSize={'1em'}
                      as={ActionInput}
                      name={'value'}
                      type={'number'}
                      value={value}
                      action={{ type: UPDATE_BAR_CHART_ELEMENT, index }}
                      dispatch={dispatchBarchart}
                      textAlign={'right'}
                    />
                  </InputGroup>
                )
            ),
          [dispatchBarchart, elements, isSelected, overlayBox, size, state]
        )}
      </Overlay>
      <Barchart
        size={size}
        fontWeight={fontWeight}
        lineHeight={lineHeight}
        palette={palette}
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
      />
    </Container>
  );
}
