// @flow
import * as React from 'react';
import type { PieBody, PieElement, PieFormat } from '@seine/core';

import PieSlice from './PieSlice';

export type Props = $Shape<PieFormat> & PieBody;

/**
 * @description Pie chart content component.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function Pie({
  elements,
  fontColor = 'white',
  fontSize = 18,
  padding = 20,
  size = 360,
}: Props) {
  let angle = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`}>
      {elements.map(({ title, percent, color }: PieElement, index) => {
        const step = (percent * size) / 100;
        angle += step;
        return (
          <PieSlice
            key={index}
            index={index}
            title={title}
            fontSize={fontSize}
            fontColor={fontColor}
            padding={padding}
            percent={percent}
            size={size}
            angle={angle - step}
            step={step}
          />
        );
      })}
    </svg>
  );
}
