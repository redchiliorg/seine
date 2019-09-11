// @flow
import * as React from 'react';
import type { PieBody, PieElement, PieFormat } from '@seine/core';

import PieSlice from './PieSlice';

export type Props = $Shape<PieFormat> & PieBody;

export const defaultPiePalette = [
  '#653867',
  '#e5002d',
  '#f80048',
  '#ff3d69',
  '#ff6d8c',
];

/**
 * @description Pie chart content component.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function Pie({
  elements,
  size = 360,
  palette = defaultPiePalette,
}: Props) {
  const lengthRef = React.useRef();
  return (
    <svg viewBox={`0 0 ${size} ${size}`}>
      {elements.map(({ title, percent, as = 'g' }: PieElement, index) => {
        const length = (percent * size) / 100;
        const start = index === 0 ? 0 : lengthRef.current;
        lengthRef.current = start + length;
        return (
          <PieSlice
            as={as}
            key={index}
            start={start}
            length={length}
            color={defaultPiePalette[index % palette.length]}
            innerFontColor={'white'}
            outerFontColor={'black'}
            isInnerText={percent >= 25}
            size={size}
          >
            <PieSlice.Percent size={1}>{percent}</PieSlice.Percent>
            <PieSlice.Title size={0.75}>{title}</PieSlice.Title>
          </PieSlice>
        );
      })}
    </svg>
  );
}
