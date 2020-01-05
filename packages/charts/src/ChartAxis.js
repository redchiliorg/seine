// @flow
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import * as React from 'react';

import ChartSvg from './ChartSvg';

type Props = {
  direction?: 'up' | 'right',
  length: number,
  noLine?: boolean,
  max: number,
  min?: number,
  step: number,
  units?: string,
  width?: number,
  x?: number,
  y?: number,
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
  x = 0,
  y = 0,
}: Props) {
  const count = Math.floor((max - min) / step);
  const offset = length / count;
  const total = count + !!finite;

  const [
    { getScaledWidth, getScaledHeight },
    childMethodsRef,
  ] = useTypographyChildrenMethods(total - 1);

  const width = getScaledWidth();
  const height = getScaledHeight();

  return (
    <ChartSvg
      x={x}
      {...(direction === 'up'
        ? {
            meetOrSlice: 'slice',
            viewBox: 'portrait',
            textAlignment: 'left',
            minWidth: width,
          }
        : {
            meetOrSlice: 'slice',
            viewBox: 'portrait',
            minHeight: height,
          })}
    >
      {Array.from({ length: total }).map((_, index) => [
        !noLine && (
          <line
            key={'line'}
            x1={+(direction === 'right' && offset * index)}
            x2={+(direction === 'right' && offset * (index + 1))}
            y1={y - (direction === 'up' ? offset * index : height)}
            y2={y - (direction === 'up' ? offset * (index + 1) : height)}
            stroke={'black'}
          />
        ),
        index > 0 && (
          <SvgTypography
            key={'value'}
            ref={childMethodsRef}
            {...(direction === 'right' && { dominantBaseline: 'hanging' })}
            {...(direction === 'up' && { dominantBaseline: 'end' })}
            {...(direction === 'up' && { textAnchor: 'end' })}
            x={direction === 'right' ? offset * index : width}
            y={y - (direction === 'up' ? offset * index : height)}
          >
            {`${parseInt(min + (index * (max - min)) / count)}`}
            {units}
          </SvgTypography>
        ),
      ])}
    </ChartSvg>
  );
}
