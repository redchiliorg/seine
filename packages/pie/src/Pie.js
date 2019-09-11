// @flow
import * as React from 'react';
import type { PieBody, PieElement, PieFormat } from '@seine/core';

import { describeArc, polarToCartesian } from './helpers';

type Props = $Shape<PieFormat> & PieBody;

export const defaultPiePalette = [
  '#653867',
  '#e5002d',
  '#f80048',
  '#ff3d69',
  '#ff6d8c',
];
export const defaultPieSize = 360;
export const defaultPieUnits = '%';

/**
 * @description Pie chart content component.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function Pie({
  elements,
  palette = defaultPiePalette,
  size = defaultPieSize,
  units = defaultPieUnits,
}: Props) {
  const fontSize = size / 24;
  const gutter = size / 6;
  const center = size / 2;
  const radius = center - gutter;
  const sum = React.useMemo(
    () => elements.reduce((acc, { percent }) => acc + percent, 0),
    [elements]
  );
  const quarter = sum / 4;

  let end = 0;

  return (
    <svg viewBox={`0 0 ${size} ${size}`}>
      {elements.map(
        ({ title, percent: value, as: Group = 'g' }: PieElement, index) => {
          const start = end;
          const length = (value * 360) / sum;

          const textColor = value >= quarter ? 'white' : 'black';
          const [textX, textY] = polarToCartesian(
            center,
            center,
            value >= quarter ? radius / 2 : radius + radius / 3,
            start + length / 2
          );

          end += length;
          const color = palette[index % palette.length];

          return (
            <React.Fragment key={index}>
              <path
                fill={
                  index === elements.length - 1 && color === palette[0]
                    ? palette[1]
                    : color
                }
                d={describeArc(center, center, radius, start, end)}
              />

              <Group>
                <text
                  fontSize={fontSize}
                  textAnchor="middle"
                  fill={textColor}
                  x={textX}
                  y={textY}
                >
                  {value}
                  {units}
                </text>

                <text
                  fontSize={0.75 * fontSize}
                  textAnchor="middle"
                  fill={textColor}
                  x={textX}
                  y={textY}
                  dy={fontSize}
                >
                  {title}
                </text>
              </Group>
            </React.Fragment>
          );
        }
      )}
    </svg>
  );
}
