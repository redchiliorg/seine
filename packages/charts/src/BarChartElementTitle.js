// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';

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
 * @description Title of an element in bar chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartElementTitle({
  children,
  fill,
  height,
  lineHeight,
  x,
  y,
}: Props) {
  return (
    <SvgTypography
      x={x}
      y={y + lineHeight}
      height={height}
      fill={fill}
      variant={'h6'}
    >
      {children}
    </SvgTypography>
  );
}
