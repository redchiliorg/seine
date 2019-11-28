// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';

export type Props = {
  fontSize: number,
  fontWeight: number,
  group: string,
  height: number,
  lineHeight: number,
  width: number,
  x: number,
  y: number,
};

/**
 * @description Group text of line chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function LineChartGroup({ group, x, y }: Props) {
  return (
    <SvgTypography
      dominantBaseline={'hanging'}
      fontWeight={'bold'}
      textAnchor={'middle'}
      variant={'h5'}
      x={x}
      y={y}
    >
      {group}
    </SvgTypography>
  );
}
