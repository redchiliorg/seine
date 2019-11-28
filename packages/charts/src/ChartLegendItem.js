// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';

export type Props = {
  fill: string,
  fontSize: number,
  lineHeight: number,
  size: number,
  title: string,
  width: number,
  x: number,
  y: number,
};

/**
 * @description Legend of column chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartLegendItem({
  fill,
  fontSize,
  size,
  title,
  width,
  x,
  y,
}: Props) {
  return (
    <g fontSize={fontSize} width={width}>
      <rect fill={fill} height={size} width={size} x={x} y={y} />
      <SvgTypography dominantBaseline={'middle'} x={x + size} y={y + size / 2}>
        {'  '}
        {title}
      </SvgTypography>
    </g>
  );
}
