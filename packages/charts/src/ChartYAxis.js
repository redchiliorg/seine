// @flow
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import * as React from 'react';

type Props = {
  arrow?: boolean,
  finite?: boolean,
  length: number,
  noLine?: boolean,
  max: number,
  min?: number,
  step: number,
  units?: string,
  x?: number,
  y: number,
  maxWidth?: number,
};

/**
 * @description Chart range axis based on (min, max, step)
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartYAxis({
  arrow = false,
  length,
  noLine = false,
  finite = false,
  maxWidth = null,
  max,
  min = 0,
  step,
  units = '',
  x = 0,
  y,
}: Props) {
  const count = Math.floor((max - min) / step);
  const offset = length / count;
  const total = count + !!finite;
  const [{ getScaledWidth }, textMethodsRef] = useTypographyChildrenMethods(
    total - 1
  );
  const textWidth = maxWidth || getScaledWidth();

  return (
    <>
      {Array.from({ length: total }).map((_, index) => [
        !noLine && index !== count && (
          <line
            key={'line'}
            x1={x + textWidth}
            x2={x + textWidth}
            y1={y - offset * index}
            y2={y - offset * (index + 1)}
            stroke={'black'}
          />
        ),
        index > 0 && (
          <SvgTypography
            key={'value'}
            ref={textMethodsRef}
            x={x + textWidth}
            y={y - offset * index}
            dominantBaseline={'end'}
            textAnchor={'end'}
            height={length / total}
            width={textWidth}
          >
            {`${parseInt(min + (index * (max - min)) / count)}${units}  `}
          </SvgTypography>
        ),
      ])}
      {arrow && (
        <path
          d={`m${x + textWidth} ${y - length}v${1}`}
          markerStart="url(#arrowUpMarker)"
        />
      )}
    </>
  );
}