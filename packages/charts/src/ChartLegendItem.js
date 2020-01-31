// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';

export type Props = {
  fill: string,
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
export default React.forwardRef(function ChartLegendItem(
  { fill, size, title, width, x, y }: Props,
  ref
) {
  return (
    <g width={width}>
      <rect fill={fill} height={size} width={size} x={x} y={y} />
      <SvgTypography
        dominantBaseline={'middle'}
        x={x + size}
        y={y + size / 2}
        height={size}
        ref={ref}
      >
        {'  '}
        {title}
      </SvgTypography>
    </g>
  );
});
