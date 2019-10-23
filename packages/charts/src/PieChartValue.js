// @flow
import * as React from 'react';

export type Props = {
  fill: string,
  fontSize: number,
  index: number,
  lineHeight: number,
  units: string,
  value: number,
  x: number,
  y: number,
};

/**
 * @description Value of a chart pie slice.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartValue({
  fill,
  fontSize,
  units,
  value,
  x,
  y,
}: Props) {
  return (
    <text
      fill={fill}
      fontSize={fontSize}
      key={'value'}
      textAnchor={'middle'}
      x={x}
      y={y}
    >
      {value}
      {units}
    </text>
  );
}
