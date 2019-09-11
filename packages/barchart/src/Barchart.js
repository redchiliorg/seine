// @flow
import * as React from 'react';
import type { BarchartBody, BarchartFormat } from '@seine/core';

export const defaultBarchartSize = 100;
export const defaultBarchartFontWeight = 500;
export const defaultBarchartLineHeight = 1.75;
export const defaultBarchartPalette = [
  '#fa6479',
  '#cb91a0',
  '#a38ca4',
  '#7482aa',
  '#35aeb7',
  '#01b25c',
  '#e1c54e',
  '#f89764',
  '#a3704d',
];

type Props = BarchartBody & $Shape<BarchartFormat>;

/**
 * @description Bar chart content renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function Barchart({
  elements,
  size = defaultBarchartSize,
  fontWeight = defaultBarchartFontWeight,
  lineHeight = defaultBarchartLineHeight,
  palette = defaultBarchartPalette,
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
