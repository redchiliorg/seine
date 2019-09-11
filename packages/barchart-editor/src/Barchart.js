// @flow
import * as React from 'react';
import type {
  BarchartBody,
  BarchartFormat,
} from '@seine/core/src/types/barchart';

import BarchartLine from './BarchartLine';

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
 * @description Bar chart content component.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function Barchart({
  elements,
  size = 100,
  fontWeight = 500,
  lineHeight = 1.75,
  palette = defaultBarchartPalette,
}: Props) {
  const fontWidth = 2;
  const fontHeight = fontWidth * lineHeight;
  const maxValue = Math.max(...elements.map(({ value }) => value));
  const x =
    (Math.max(...elements.map(({ title }) => title.length)) * fontWidth) / 2;
  const width = fontHeight * lineHeight;
  const fontSize = fontWidth;
  const maxLength = size - (width + String(maxValue).length + 0.5) * fontWidth;

  return (
    <svg viewBox={`0 0 ${size} ${size}`}>
      {elements.map(({ title, value, as = 'g' }, index) => {
        const y = index * width;
        const color = palette[index % palette.length];
        const length = (maxLength * value) / maxValue;
        const textY = y + fontHeight;

        return (
          <BarchartLine
            as={as}
            key={index}
            x={x}
            y={y}
            width={width}
            maxValue={maxValue}
            fontSize={fontSize}
            fontWeight={fontWeight}
            title={title}
            value={value}
            length={length}
            textY={textY}
            color={color}
          />
        );
      })}
    </svg>
  );
}
