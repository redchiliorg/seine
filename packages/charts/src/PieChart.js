// @flow
import * as React from 'react';

import {
  defaultChartPalette,
  defaultChartSize,
  defaultChartUnits,
} from './constants';
import type { ChartProps } from './types';

/**
 * @description Pie chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function PieChart({
  elements,
  size = defaultChartSize,
  palette = defaultChartPalette,

  units = defaultChartUnits,
}: ChartProps) {
  const sum = React.useMemo(
    () => elements.reduce((acc, { value }) => acc + value, 0),
    [elements]
  );

  const [
    radius,
    innerRadius,
    outerRadius,
    center,
    fontSize,
    quarter,
  ] = React.useMemo(
    () => [
      size / 2 - size / 6,
      size / 2 - size / 6 + size / 9,
      size / 6,
      size / 2,
      size / 24,
      sum / 4,
    ],
    [size, sum]
  );

  const colors = React.useMemo(
    () =>
      Array.from({ length: elements.length }).map((...[, index]) => {
        const color = palette[index % palette.length];
        return index === elements.length - 1 && color === palette[0]
          ? palette[1]
          : color;
      }),
    [elements.length, palette]
  );

  let end = (3 * Math.PI) / 4;
  let endX = Math.cos(end);
  let endY = Math.sin(end);

  return (
    <svg viewBox={`0 0 ${size} ${size}`}>
      {elements.map(({ title, value, as: Group = 'g' }, index) => {
        const start = end;
        const startX = endX;
        const startY = endY;
        const length = (2 * value * Math.PI) / sum;

        end = start + length;
        endX = Math.cos(end);
        endY = Math.sin(end);

        const textColor = value >= quarter ? 'white' : 'black';
        const textX =
          center +
          (value >= quarter ? outerRadius : innerRadius) *
            Math.cos(start + length / 2);
        const textY =
          center +
          (value >= quarter ? outerRadius : innerRadius) *
            Math.sin(start + length / 2);

        return (
          <React.Fragment key={index}>
            <path
              fill={colors[index]}
              d={[
                `M ${center + radius * endX} ${center + radius * endY}`,
                `A ${radius} ${radius} 0 ${+(length > Math.PI)} 0 ${center +
                  radius * startX} ${center + radius * startY}`,
                `L ${center} ${center}`,
                `L ${center + radius * endX} ${center + radius * endY}`,
              ].join(' ')}
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
      })}
    </svg>
  );
}
