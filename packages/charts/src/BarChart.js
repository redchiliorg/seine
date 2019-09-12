// @flow
import * as React from 'react';
import type { ChartBody, ChartFormat } from '@seine/core';

import {
  defaultChartFontWeight,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartSize,
} from './constants';

type Props = ChartBody & ChartFormat;

/**
 * @description Bar chart content renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function BarChart({
  elements,
  size = defaultChartSize,
  palette = defaultChartPalette,

  fontWeight = defaultChartFontWeight,
  lineHeight = defaultChartLineHeight,
}: Props) {
  const fontSize = 2;
  const fontWidth = fontSize / 2;
  const fontHeight = fontSize * lineHeight;

  const maxValue = Math.max(...elements.map(({ value }) => value));

  const leftGutter =
    (2 + Math.max(...elements.map(({ title }) => title.length))) * fontWidth;
  const rightGutter =
    (2 + Math.max(...elements.map(({ value }) => String(value).length))) *
    fontWidth;

  const lineWidth = fontHeight * lineHeight;
  const maxLength = size - leftGutter - rightGutter;

  return (
    <svg viewBox={`0 0 ${size} ${size}`}>
      {elements.map(({ title, value, as: Group = 'g' }, index) => {
        const y = index * lineWidth;
        const length = (maxLength * value) / maxValue;

        return (
          <Group key={index}>
            <text
              x={0}
              y={y + fontHeight}
              fontSize={fontSize}
              fontWeight={fontWeight}
            >
              {title}
            </text>

            <rect
              x={leftGutter}
              y={y}
              width={length}
              height={lineWidth}
              fill={palette[index % palette.length]}
            />

            <text
              x={leftGutter + length + fontWidth}
              y={y + fontHeight}
              fontSize={fontSize}
              fontWeight={fontWeight}
            >
              {value}
            </text>

            {/** right spacing to prevent auto filling of a grid cell */}
            <rect
              x={leftGutter + length + fontWidth}
              y={y}
              width={rightGutter}
              height={lineWidth}
              fill={'transparent'}
            />
          </Group>
        );
      })}
    </svg>
  );
}
