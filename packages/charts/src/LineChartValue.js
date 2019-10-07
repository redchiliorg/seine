// @flow
import * as React from 'react';

export type Props = {
  fontSize: number,
  height: number,
  index: number,
  lineHeight: number,
  units: string,
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
export default function LineChartValue({
  fontSize,
  units,
  value,
  x,
  y,
}: Props) {
  return (
    <text fontSize={fontSize} x={x} y={y}>
      {value}
      {units}
    </text>
  );
}
