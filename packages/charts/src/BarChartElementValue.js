// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';

export type Props = {
  children: string,
  fill: string,
  height: number,
  lineHeight: number,
  index: number,
  units: string,
  width: number,
  x: number,
  y: number,
};

/**
 * @description Value of an element in bar chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartElementValue({
  children,
  fill,
  units,
  x,
  y,
}: Props) {
  return (
    <SvgTypography
      dominantBaseline={'middle'}
      fill={fill}
      variant={'h6'}
      x={x}
      y={y}
    >
      {children}
      {units}
    </SvgTypography>
  );
}
