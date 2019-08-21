// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

import PieSlice, { Props as PieSliceProps } from './PieSlice';
import ActionInput from './ui/ActionInput';
import { UPDATE_PIE_ELEMENT } from './reducers/pie';
import SVGTextInput from './ui/SVGTextInput';

type Props = PieSliceProps & {
  index: number,
  dispatch: Function,
  overlay: React.Node,
};

const PieSliceActionInput = styled(ActionInput)`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  width: ${({ type }) => (type === 'number' ? '2em' : '')};
`;

/**
 * @description Slice element editor of pie chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieSliceEditor({
  index,
  dispatch,
  overlay,
  title,
  percent,
  size,
  ...pieSliceProps
}: Props) {
  const [titleText, setTitleText] = React.useState(null);
  const [percentText, setPercentText] = React.useState(null);

  return (
    <>
      <PieSlice
        size={size}
        title={title}
        percent={percent}
        titleTextRef={setTitleText}
        percentTextRef={setPercentText}
        {...pieSliceProps}
      />
      {overlay &&
        ReactDOM.createPortal(
          <>
            {titleText && (
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
            {percentText && (
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
