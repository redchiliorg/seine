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
 * @description Bar chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function BarChart({
  elements,
  fontWeight = defaultChartFontWeight,
  fontSize = defaultChartFontSize,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  size = defaultChartSize,
}: ChartProps) {
  const { barHeight, fontHeight, fontWidth, textPadding } = useChartFormat(
    fontSize,
    lineHeight
  );

  const titleMaxLen =
    Math.max(...elements.map(({ title }) => title.length)) * fontWidth;
  const valueMaxLen =
    Math.max(...elements.map(({ value }) => `${value}`.length)) * fontWidth;

  const barMaxLen = size - (titleMaxLen + valueMaxLen + textPadding * 2);
  const maxValue = Math.max(...elements.map(({ value }) => value));

  return (
    <svg
      viewBox={`0 0 ${size} ${(elements.length * barHeight) / 2}`}
      width={'100%'}
      height={'100%'}
    >
      {elements.map(({ title, value, as: Group = 'g' }, index) => {
        const len = (barMaxLen * value) / maxValue;

        return (
          <svg
            key={index}
            fontSize={fontSize}
            fontWeight={fontWeight}
            y={(index * barHeight) / 2}
            fill={palette[index % palette.length]}
          >
            <Group>
              <text y={fontHeight}>{title}</text>
              <text dy={fontHeight} x={titleMaxLen + len + 2 * textPadding}>
                {value}
              </text>
            </Group>

            <rect
              x={titleMaxLen + textPadding}
              y={0}
              width={len}
              height={barHeight / 2}
            />
          </svg>
        );
      })}
    </svg>
  );
}
