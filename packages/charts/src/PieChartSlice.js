// @flow
import * as React from 'react';

export type Props = {
  center: number,
  endX: number,
  endY: number,
  index: number,
  palette: string[],
  radius: number,
  startX: number,
  startY: number,
};

/**
 * @description Slice of a chart pie.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartSlice({
  center,
  endX,
  endY,
  index,
  length,
  palette,
  radius,
  startX,
  startY,
}: Props) {
  return [
    <path
      d={[
        `M ${center + radius * endX} ${center + radius * endY}`,
        `A ${radius} ${radius} 0 ${+(length > Math.PI)} 0 ${center +
          radius * startX} ${center + radius * startY}`,
        `L ${center} ${center}`,
        `L ${center + radius * endX} ${center + radius * endY}`,
      ].join(' ')}
      fill={palette[index % palette.length]}
      key={'path'}
    />,
  ];
}
