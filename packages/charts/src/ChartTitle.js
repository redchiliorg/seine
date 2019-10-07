// @flow
import * as React from 'react';

export type Props = {
  children: string,
  fontSize: number,
  fontWeight: 'normal' | 'bold',
  lineHeight: number,
  x: number,
  y: number,
};

/**
 * @description Title of bar chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartTitle({
  children,
  fontSize,
  fontWeight,
  x,
  y,
}: Props) {
  return (
    <text fontSize={fontSize} fontWeight={fontWeight} x={x} y={y}>
      {children}
    </text>
  );
}
