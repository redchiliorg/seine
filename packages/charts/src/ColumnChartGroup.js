// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';
import type { BlockElement } from '@seine/core';

export type Props = {
  elements: BlockElement[],
  fontSize: number,
  group: string,
  height: number,
  lineHeight: number,
  minValue: number,
  maxValue: number,
  palette: string[],
  size: number,
  units: string,
  width: number,
  x: number,
  y: number,
};

/**
 * @description Group of column chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ColumnChartGroup({
  elements,
  fontSize,
  group,
  height,
  lineHeight,
  minValue,
  maxValue,
  palette,
  size,
  units,
  x,
  y,
}: Props) {
  return [
    ...elements.reduce((acc, { value }, index) => {
      const rectHeight = (height * value) / (maxValue - minValue);
      const dy = (height * minValue) / (maxValue - minValue);
      const fill = palette[index % palette.length];

      return [
        ...acc,
        <rect
          fill={fill}
          fontSize={fontSize}
          height={rectHeight - dy}
          key={['bar', index]}
          width={size}
          x={x + size * index}
          y={dy + y - rectHeight}
        />,
        <SvgTypography
          fill={fill}
          fontSize={fontSize}
          key={['value', index]}
          textAnchor="middle"
          x={x + size * index}
          y={Math.min(dy + y - rectHeight, y) - (fontSize * lineHeight) / 2}
        >
          {value < minValue
            ? `< ${minValue}`
            : value > maxValue
            ? `> ${maxValue}`
            : value}
          {units}
        </SvgTypography>,
      ];
    }, []),
    <SvgTypography
      key={'text'}
      fontSize={1.5 * fontSize}
      textAnchor={'middle'}
      x={x + (size * elements.length) / 2}
      y={y + 1.5 * fontSize * lineHeight}
    >
      {group}
    </SvgTypography>,
  ];
}
