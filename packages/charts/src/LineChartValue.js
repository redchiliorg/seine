// @flow
import * as React from 'react';

export type Props = {
  fontSize: number,
  height: number,
  index: number,
  lineHeight: number,
  value: number,
  width: number,
  x: number,
  y: number,
};

/**
 * @description Element value of line chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function LineChartValue({ fontSize, value, x, y }: Props) {
  return (
    <text fontSize={fontSize} x={x} y={y}>
      {value}
    </text>
  );
}
