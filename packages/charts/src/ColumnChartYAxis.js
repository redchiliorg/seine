// @flow
import * as React from 'react';

// eslint-disable-next-line
export function ColumnChartYAxis({
  dy,
  fontSize,
  height,
  maxValue,
  minValue,
  x,
  y,
}) {
  return Array.from({
    length: dy > 0 ? Math.floor((maxValue - minValue) / dy) + 1 : 0,
  }).map((_, index, { length }) => (
    <text
      fill={'#000000'}
      fontSize={fontSize}
      key={index}
      textAnchor={'middle'}
      x={x + 1}
      y={y + height - (index * height) / length}
    >
      <tspan>{minValue + index * dy}</tspan>
    </text>
  ));
}
