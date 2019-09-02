// @flow
import * as React from 'react';
import type { PieFormat } from '@seine/core';

import { describeArc, polarToCartesian } from './helpers';

export type SVGTextElement = React.ElementType<*> & {
  getAttribute: (string) => string,
  getBBox: () => DOMRect,
};

type Config = PieFormat & {
  titleTextRef: React.ElementRef<SVGTextElement> | null,
  percentTextRef: React.ElementRef<SVGTextElement> | null,
  step: number,
};

export type Props = $Shape<Config> & {
  angle: number,
  color: string,
  title: string,
  percent: number,
};

/**
 * @description Slice element of pie chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieSlice({
  angle,
  color,
  percent,
  step,
  title,
  titleTextRef = null,
  percentTextRef = null,
  padding = 20,
  size = 360,
  fontSize = 18,
  innerFontColor = 'white',
  outerFontColor = 'black',
}: Props) {
  const center = size / 2;
  const radius = center - padding;
  const middleAngle = angle + step / 2;
  const [innerTextX, innerTextY] = polarToCartesian(
    center,
    center,
    radius / 2,
    middleAngle
  );
  const [outerTextX, outerTextY] = polarToCartesian(
    center,
    center,
    radius + radius / 3,
    middleAngle
  );
  const smallFontSize = fontSize * 0.75;
  const isInnerText = percent >= 25;

  return (
    <g>
      <path
        fill={color}
        d={describeArc(center, center, radius, angle, angle + step)}
      />
      <text
        textAnchor="middle"
        fontSize={fontSize}
        fill={isInnerText ? innerFontColor : outerFontColor}
        x={isInnerText ? innerTextX : outerTextX}
        y={isInnerText ? innerTextY : outerTextY}
        {...(percentTextRef ? { ref: percentTextRef, opacity: 0 } : {})}
      >
        {Math.round(percent)}%
      </text>
      <text
        textAnchor="middle"
        fontSize={smallFontSize}
        dy={fontSize}
        fill={isInnerText ? innerFontColor : outerFontColor}
        x={isInnerText ? innerTextX : outerTextX}
        y={isInnerText ? innerTextY : outerTextY}
        {...(titleTextRef ? { ref: titleTextRef, opacity: 0 } : {})}
      >
        {title}
      </text>
    </g>
  );
}
