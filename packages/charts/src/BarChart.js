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
import { useChartFormat } from './helpers';

type Props = $Rest<ChartProps, {| kind: string |}>;

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
}: Props) {
  const { barHeight, fontHeight, fontWidth } = useChartFormat(
    fontSize,
    lineHeight
  );

  const titleMaxLen =
    Math.max(...elements.map(({ title }) => title.length)) * fontWidth;
  const valueMaxLen =
    Math.max(...elements.map(({ value }) => `${value}`.length)) * fontWidth;

  const barMaxLen = size - (titleMaxLen + valueMaxLen + fontSize * 2);
  const maxValue = Math.max(...elements.map(({ value }) => value));

  const height = (elements.length * barHeight) / 2;

  return (
    <svg
      viewBox={`0 0 ${size} ${height}`}
      width={'100%'}
      fontSize={fontSize}
      fontWeight={fontWeight}
      preserveAspectRatio={'xMidYMax meet'}
    >
      {elements.map(({ title, value, as: Group = 'g' }, index) => {
        const len = (barMaxLen * value) / maxValue;
        const color = palette[index % palette.length];

        return (
          <svg key={index} y={(index * barHeight) / 2} fill={color}>
            <Group>
              <text y={fontHeight}>{title}</text>
              <text dy={fontHeight} x={titleMaxLen + len + 1.5 * fontSize}>
                {value}
              </text>
            </Group>

            <path
              d={`M${titleMaxLen + fontSize},0 h${len}`}
              strokeWidth={barHeight}
              stroke={color}
            />
          </svg>
        );
      })}
    </svg>
  );
}
