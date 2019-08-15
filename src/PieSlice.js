import * as React from 'react';

import { polarToCartesian, describeArc } from './Pie.helpers';

/**
 * Компонент элемента источник значения для pie-диаграмы
 **/
export default function PieSlice(props) {
  const { color, fontSize, percent, title, cx, cy, r, start, end } = props;
  const [textX, textY] = polarToCartesian(
    cx,
    cy,
    r / 2,
    start + (end - start) / 2
  );
  return (
    <g>
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
}
