// @flow
import * as React from 'react';
import styled from 'styled-components';

import type { Props as PieProps } from './Pie';
import Pie from './Pie';
import { useBlockSelection } from './helpers';
import reduce from './reducers/pie';
import type { PieElement } from './types';
import PieSliceEditor from './PieSliceEditor';
import { UPDATE_BLOCK_DATA } from './reducers/content';
import type { Action } from './reducers/pie';

type Props = {
  id: string,
  dispatch: Function,
  selected: boolean,
  edit: boolean,
} & PieProps;

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

/**
 * @description Pie editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieEditor({
  id,
  dispatch,
  selected,
  elements,
  fontColor = 'white',
  fontSize = 18,
  padding = 20,
  size = 360,
  edit = false,
}: Props) {
  const overlay = React.useRef<HTMLDivElement>(null);
  const dispatchPie = React.useCallback(
    (action: Action) => {
      dispatch({
        type: UPDATE_BLOCK_DATA,
        id,
        data: { elements: reduce(elements, action) },
      });
    },
    [dispatch, elements, id]
  );

  let angle = 0;
  return (
    <Container {...useBlockSelection(id, dispatch)} isSelected={selected}>
      <Overlay ref={overlay} />
      {edit ? (
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
