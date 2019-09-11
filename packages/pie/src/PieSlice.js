// @flow
import * as React from 'react';
import type { PieFormat } from '@seine/core';

import { describeArc, polarToCartesian } from './helpers';

const PieSlicePercent: ({ children: number, size: number }) => * = () => null;
PieSlicePercent.defaultProps = { size: 1 };
PieSlice.Percent = PieSlicePercent;

const PieSliceTitle: ({ children: string, size: number }) => * = () => null;
PieSliceTitle.defaultProps = { size: 0.75 };
PieSlice.Title = PieSliceTitle;

type Config = PieFormat & {
  as: React.ElementType,
  isInnerText: boolean,
};

export type Props = {
  start: number,
  length: number,
  color: string,
  size: number,
  children: [
    React.ElementType<typeof PieSliceTitle>,
    React.ElementType<typeof PieSlicePercent>
  ],
} & $Shape<Config>;

/**
 * @description Slice element of pie chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieSlice({
  start,
  length,
  color,
  size,
  as: Group = 'g',
  innerFontColor,
  outerFontColor,
  isInnerText = false,
  children,
}: Props) {
  const fontSize = size / 24;
  const gutter = size / 6;
  const center = size / 2;
  const radius = center - gutter;
  const textColor = isInnerText ? innerFontColor : outerFontColor;
  const [textX, textY] = polarToCartesian(
    center,
    center,
    isInnerText ? radius / 2 : radius + radius / 3,
    start + length / 2
  );

  return (
    <>
      <path
        fill={color}
        d={describeArc(center, center, radius, start, start + length)}
      />
      <Group>
        {React.Children.map(
          children,
          (child: React.Node, index) =>
            child && (
              <text
                key={child.type.name}
                fontSize={fontSize * child.props.size}
                textAnchor="middle"
                fill={textColor}
                x={textX}
                y={textY}
                dy={fontSize * index}
              >
                {child.props.children}
              </text>
            )
        )}
      </Group>
    </>
  );
}
