// @flow
import * as React from 'react';

export type Props = {
  children: string,
  fill: string,
  height: number,
  lineHeight: number,
  index: number,
  width: number,
  x: number,
  y: number,
};

/**
 * @description Value of a chart bar.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartValue({
  children,
  fill,
  lineHeight,
  x,
  y,
}: Props) {
  return (
    <text x={x} y={y + lineHeight} fill={fill}>
      {children}
    </text>
  );
}
