// @flow
import * as React from 'react';

import {
  defaultChartFontWeight,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartSize,
} from './constants';
import type { ChartProps } from './types';

/**
 * @description Column chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function ColumnChart({
  elements,
  size = defaultChartSize,
  palette = defaultChartPalette,

  fontWeight = defaultChartFontWeight,
  lineHeight = defaultChartLineHeight,
}: ChartProps) {
  const fontSize = 2;
  const fontWidth = fontSize / 2;
  const fontHeight = fontSize * lineHeight;
  const lineWidth = fontHeight * lineHeight;

  const gutter = size / ((9 * elements.length) / 16) + fontHeight;

  size = size - 2 * gutter;

  const maxValue = Math.max(...elements.map(({ value }) => value));

  const maxLength = size - fontHeight;

  return (
    <svg viewBox={`0 0 ${elements.length * lineWidth} ${size}`}>
      {elements.map(({ title, value, as: Group = 'g' }, index) => {
        const fill = palette[index % palette.length];
        const x = index * lineWidth;
        const length = (maxLength * value) / maxValue;

        return (
          <Group key={index}>
            <text
              x={x + fontWidth}
              y={maxLength - length + fontHeight / 2}
              fill={fill}
              fontSize={fontSize}
              fontWeight={fontWeight}
            >
              {value}
            </text>
            <rect
              x={x}
              y={maxLength - length + fontHeight}
              width={lineWidth}
              height={length}
              fill={fill}
            />
          </Group>
        );
      })}
    </svg>
  );
}
