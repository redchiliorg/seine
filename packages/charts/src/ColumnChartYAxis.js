// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';

// eslint-disable-next-line
export function ColumnChartYAxis({
  dy,
  height,
  maxValue,
  minValue,
  units,
  x,
  y,
}) {
  return Array.from({
    length: dy > 0 ? Math.floor((maxValue - minValue) / dy) + 1 : 0,
  }).map((_, index, { length }) => (
    <SvgTypography
      key={index}
      textAnchor={'end'}
      x={x}
      y={y + height - (index * height) / length}
    >
      {minValue + index * dy}
      {units}
    </SvgTypography>
  ));
}
