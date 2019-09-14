// @flow
import * as React from 'react';

import {
  defaultChartFontSize,
  defaultChartFontWeight,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartSize,
} from './constants';
import type { ChartProps } from './types';
import { useChartFormat } from './hooks';

/**
 * @description Column chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function ColumnChart({
  elements,
  fontWeight = defaultChartFontWeight,
  fontSize = defaultChartFontSize,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  size = defaultChartSize,
}: ChartProps) {
  const { barHeight, textPadding } = useChartFormat(1.5 * fontSize, lineHeight);

  const barMaxLen = size - (textPadding + lineHeight);
  const maxValue = Math.max(...elements.map(({ value }) => value));

  const width = (elements.length * barHeight) / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${size}`}
      width={'100%'}
      height={'100%'}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {elements.map(({ title, value, as: Group = 'g' }, index) => {
        const len = (barMaxLen * value) / maxValue;
        const color = palette[index % palette.length];

        return (
          <svg key={index} x={(index * barHeight) / 2}>
            <Group>
              <text
                fill={color}
                x={barHeight / 4}
                y={size - len - textPadding}
                textAnchor={'middle'}
              >
                {value}
              </text>
            </Group>

            <path
              d={`M0,${size} v${-len}`}
              strokeWidth={barHeight}
              stroke={color}
            />
          </svg>
        );
      })}
    </svg>
  );
}
