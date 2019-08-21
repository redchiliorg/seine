import * as React from 'react';

import type { PieData, PieElement } from './types';
import PieSlice from './PieSlice';

type Config = {
  fontColor: string,
  fontSize: number,
  padding: number,
  size: number,
};

export type Props = $Shape<Config> & PieData;

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
            title={title}
            color={color}
            index={index}
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
