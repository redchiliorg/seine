// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';
import type { BlockElement } from '@seine/core';
import styled, { css } from 'styled-components/macro';

export type Props = {
  elements: BlockElement[],
  group: string,
  height: number,
  minValue: number,
  maxValue: number,
  palette: string[],
  size: number,
  units: string,
  width: number,
  x: number,
  y: number,
};

const ColumnChartValue = styled(SvgTypography)`
  ${({ theme: { breakpoints } }) => css`
    ${breakpoints.down('md')} {
      font-size: 0.65rem;
    }
  `}
`;

/**
 * @description Group of column chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ColumnChartGroup({
  elements,
  group,
  height,
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
          height={rectHeight - dy}
          key={['bar', index]}
          width={size}
          x={x + size * index}
          y={dy + y - rectHeight}
        />,
        <ColumnChartValue
          fill={fill}
          key={['value', index]}
          textAnchor={'middle'}
          x={x + size * index + size / 2}
          y={Math.min(dy + y - rectHeight, y)}
        >
          {value}
          {units}
        </ColumnChartValue>,
      ];
    }, []),
    <path
      key={'path'}
      d={`m${x - size} ${y}h${size * elements.length + 2 * size}`}
      stroke={'black'}
    />,
    <SvgTypography
      key={'text'}
      textAnchor={'middle'}
      dominantBaseline={'hanging'}
      x={x + (size * elements.length) / 2}
      y={y}
    >
      {group}
    </SvgTypography>,
  ];
}
