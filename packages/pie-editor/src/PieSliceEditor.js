// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { PieSlice } from '@seine/pie';
import type { PieSliceProps } from '@seine/pie';
import { ActionInput } from '@seine/ui';

import { UPDATE_PIE_ELEMENT } from './reducer';
import SVGTextInput from './SVGTextInput';

type Props = PieSliceProps & {
  index: number,
  dispatch: Function,
  overlay: React.ComponentType<any> | null,
};

const PieSliceActionInput = styled(ActionInput)`
  background-color: transparent;
  border: none;
  margin: 0;
  width: ${({ type }) => (type === 'number' ? '2em' : '')};
  && {
    padding: 0;
  }
`;

/**
 * @description Slice element editor of pie chart.
 * @param {Props} props
 * @returns {React.Node}
 * todo ref to boundary box in PieSlice
 */
export default function PieSliceEditor({
  index,
  dispatch,
  overlay,
  title,
  percent,
  size,
  angle,
  color,
  step,
  fontSize,
  fontColor,
  padding,
}: Props) {
  const [titleText, setTitleText] = React.useState(null);
  const [percentText, setPercentText] = React.useState(null);

  return (
    <>
      <PieSlice
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
        titleTextRef={setTitleText}
        percentTextRef={setPercentText}
      />
      {overlay &&
        ReactDOM.createPortal(
          <>
            {titleText !== null && (
              <SVGTextInput
                size={size}
                overlay={overlay}
                as={PieSliceActionInput}
                name={'title'}
                value={title}
                dispatch={dispatch}
                action={{ type: UPDATE_PIE_ELEMENT, index }}
              >
                {titleText}
              </SVGTextInput>
            )}
            {percentText !== null && (
              <SVGTextInput
                size={size}
                overlay={overlay}
                as={PieSliceActionInput}
                name={'percent'}
                type={'number'}
                minvalue={5}
                maxvalue={100}
                value={Math.max(1, Math.min(percent, 100))}
                dispatch={dispatch}
                action={{ type: UPDATE_PIE_ELEMENT, index }}
              >
                {percentText}
              </SVGTextInput>
            )}
          </>,
          overlay
        )}
    </>
  );
}
