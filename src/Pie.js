import * as React from 'react';

import { polarToCartesian, describeArc } from './Pie.helpers';
import type { PieElement } from './types';

type Props = {
  children: PieElement[],
  fontSize?: number,
  padding?: number,
};

/**
 * @description Pie chart content component.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function Pie({ children, fontSize = 18, padding = 20 }: Props) {
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const r = cx - padding;
  let end = 0;

  return (
    <svg viewBox={`0 0 ${size} ${size}`}>
      {children.map(({ title, percent, color }: PieElement, index) => {
        const start = end;
        end += (percent * size) / 100;
        const [textX, textY] = polarToCartesian(
          cx,
          cy,
          r / 2,
          start + (end - start) / 2
        );
        return (
          <g key={index}>
            <path fill={color} d={describeArc(cx, cy, r, start, end)} />
            <text
              textAnchor="middle"
              fill="white"
              fontSize={fontSize}
              x={textX}
              y={textY}
            >
              <tspan>{Math.round(percent)}%</tspan>
            </text>
            {percent > 50 && (
              <text
                textAnchor="middle"
                fill="white"
                fontSize={fontSize}
                x={textX}
                y={textY}
                dy={fontSize}
              >
                <tspan>{title}</tspan>
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
