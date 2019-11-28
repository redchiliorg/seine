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
  lineHeight,
  size,
  title,
  width,
  x,
  y,
}: Props) {
  return (
    <g fontSize={fontSize} width={width}>
      <rect fill={fill} height={size} width={size} x={x} y={y} />
      <SvgTypography
        x={x + size + fontSize * lineHeight}
        y={y + (fontSize * lineHeight) / 2}
      >
        {title}
      </SvgTypography>
    </g>
  );
}
