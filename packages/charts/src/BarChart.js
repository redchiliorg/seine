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

/**
 * @description Bar chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function BarChart({
  elements,
  size = defaultChartSize,
  palette = defaultChartPalette,
  fontSize = defaultChartFontSize,

  fontWeight = defaultChartFontWeight,
  lineHeight = defaultChartLineHeight,
}: ChartProps) {
  const fontWidth = fontSize / 2;
  const textGutter = 2;
  const maxLen = size;

  const fontHeight = fontSize * lineHeight;
  const barLineSize = fontSize * 3;
  const maxSize = elements.length * barLineSize;

  const [titleMaxLen, valueMaxLen, maxValue] = React.useMemo(
    () => [
      Math.max(...elements.map(({ title }) => title.length)) * fontWidth,
      Math.max(...elements.map(({ value }) => `${value}`.length)) * fontWidth,
      Math.max(...elements.map(({ value }) => value)),
    ],
    [elements, fontWidth]
  );

  const barMaxLen = maxLen - (titleMaxLen + valueMaxLen + textGutter * 2);

  return (
    <svg viewBox={`0 0 ${maxLen} ${maxSize}`}>
      {elements.map(({ title, value, as: Group = 'g' }, index) => {
        const barLineStart = index * barLineSize;
        const len = (barMaxLen * value) / maxValue;

        return (
          <Group key={index}>
            <svg y={barLineStart} fontSize={fontSize} fontWeight={fontWeight}>
              <text dy={fontHeight}>{title}</text>

              <path
                d={`m${titleMaxLen + textGutter},0 h${len}`}
                strokeWidth={2 * barLineSize}
                stroke={palette[index % palette.length]}
                fill={'none'}
              />

              <text dy={fontHeight} dx={titleMaxLen + len + 2 * textGutter}>
                {value}
              </text>
            </svg>
          </Group>
        );
      })}
    </svg>
  );
}
