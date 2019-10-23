// @flow
import * as React from 'react';

export type Props = {
  fill: string,
  fontSize: number,
  index: number,
  lineHeight: number,
  title: string,
  x: number,
  y: number,
};

/**
 * @description Tile of a chart pie slice.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartTitle({ fill, fontSize, x, y, title }: Props) {
  return (
    <text
      fill={fill}
      fontSize={fontSize}
      key={'value'}
      textAnchor={'middle'}
      x={x}
      y={y}
    >
      {title}
    </text>
  );
}
