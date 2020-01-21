// @flow
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import * as React from 'react';

type Props = {
  axisValueAs?: React.ComponentType,
  arrow?: boolean,
  direction?: 'up' | 'right',
  finite?: boolean,
  length: number,
  noLine?: boolean,
  max: number,
  min?: number,
  step: number,
  units?: string,
  x?: number,
  y: number,
};

/**
 * @description Chart range axis based on (min, max, step)
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartAxis({
  arrow = false,
  direction = 'right',
  length,
  noLine = false,
  finite = false,
  max,
  min = 0,
  step,
  units,
  x = 0,
  y,
}: Props) {
  const count = Math.floor((max - min) / step);
  const offset = length / count;
  const total = count + !!finite;
  const [{ getScaledWidth }, textMethodsRef] = useTypographyChildrenMethods(
    total - 1
  );
  const textWidth = getScaledWidth();

  return (
    <>
      {Array.from({ length: total }).map((_, index) => [
        !noLine && (
          <line
            key={'line'}
            x1={x + (direction === 'right' ? offset * index : 1.25 * textWidth)}
            x2={
              x +
              (direction === 'right' ? offset * (index + 1) : 1.25 * textWidth)
            }
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
            ref={textMethodsRef}
            x={x + (direction === 'right' ? offset * index : textWidth)}
            y={y - (direction === 'up' && offset * index)}
          >
            {`${parseInt(min + (index * (max - min)) / count)} `}
            {units}
          </SvgTypography>
        ),
      ])}
      {!!arrow && (
        <marker id="arrowUp" overflow="visible" orient="auto">
          <path
            d="m0 0 8-8-33 8 33 8-8-8z"
            fill="#000000"
            fillRule="evenodd"
            stroke="#000000"
          />
        </marker>
      )}
      {!!arrow && (
        <path
          d={`m${1.25 * textWidth} ${y - length}v${1}`}
          fill="none"
          key="y-axis"
          markerStart="url(#arrowUp)"
          stroke="#000000"
        />
      )}
    </>
  );
}
