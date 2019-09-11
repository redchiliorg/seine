import * as React from 'react';

/**
 * @description Line of a bar chart.
 * @param {*} props
 * @returns {React.Node}
 */
export default function BarchartLine({
  x,
  y,
  textY,
  color,
  length,
  width,
  title,
  value,
  maxValue,
  fontSize,
  fontWeight,
  as: Group = 'g',
}) {
  return (
    <Group>
      <rect fill={color} x={x} y={y} height={width} width={length} />
      <rect
        fill={'transparent'}
        x={x + length}
        y={y}
        height={width}
        width={100}
      />
      <text fontSize={fontSize} fontWeight={fontWeight} y={textY}>
        {title}
      </text>
      <text
        fontSize={fontSize}
        fontWeight={fontWeight}
        textAnchor={value === maxValue ? 'end' : 'start'}
        x={value === maxValue ? 100 : x + length + fontSize / 2}
        y={textY}
      >
        {value}
      </text>
    </Group>
  );
}
