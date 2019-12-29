// @flow
import { SvgTypography } from '@seine/styles';
import * as React from 'react';

type Props = {
  axisValueAs?: React.ComponentType,
  direction?: 'up' | 'right',
  length: number,
  noLine?: boolean,
  max: number,
  min?: number,
  step: number,
  units?: string,
  x: number,
  y: number,
};

/**
 * @description Chart range axis based on (min, max, step)
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartAxis({
  direction = 'right',
  length,
  noLine = false,
  finite = false,
  max,
  min = 0,
  step,
  units,
  x,
  y,
}: Props) {
  const count = Math.floor((max - min) / step);
  const offset = length / count;

  return Array.from({ length: count + !!finite }).map((_, index) => [
    !noLine && (
      <line
        key={'line'}
        x1={x + (direction === 'right' && offset * index)}
        x2={x + (direction === 'right' && offset * (index + 1))}
        y1={y - (direction === 'up' && offset * index)}
        y2={y - (direction === 'up' && offset * (index + 1))}
        stroke={'black'}
      />
    ),
    index > 0 && (
      <SvgTypography
        key={'value'}
        {...(direction === 'right' && { dominantBaseline: 'hanging' })}
        {...(direction === 'up' && { dominantBaseline: 'end' })}
        {...(direction === 'up' && { textAnchor: 'end' })}
        x={x / 2}
        y={y - (direction === 'up' && offset * index)}
      >
        {`${parseInt(min + (index * (max - min)) / count)}`}
        {units}
      </SvgTypography>
    ),
  ]);
}
