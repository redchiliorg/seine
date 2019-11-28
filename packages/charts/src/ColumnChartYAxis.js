// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';

// eslint-disable-next-line
export function ColumnChartYAxis({
  dy,
  fontSize,
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
      fill={'#000000'}
      fontSize={fontSize}
      key={index}
      textAnchor={'middle'}
      x={x + 1}
      y={y + height - fontSize - (index * height) / length}
    >
      {minValue + index * dy}
      {units}
    </SvgTypography>
  ));
}
