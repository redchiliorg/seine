// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';

export type Props = {
  fill: string,
  index: number,
  title: string,
  x: number,
  y: number,
};

/**
 * @description Tile of a chart pie slice.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartTitle({ fill, x, y, title }: Props) {
  return (
    <SvgTypography
      dominantBaseline={'hanging'}
      fill={fill}
      textAnchor={'middle'}
      variant={'h5'}
      x={x}
      y={y}
    >
      {title}
    </SvgTypography>
  );
}
