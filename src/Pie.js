import * as React from 'react';

import PieSlice from './PieSlice';

Pie.defaultProps = {
  fontSize: 18,
  padding: 20,
};

/**
 * Компонент pie-диаграмы
 **/
export default function Pie(props) {
  const { children, fontSize, padding } = props;
  const size = 360;
  let start = 0;

  return (
    <svg viewBox={`0 0 ${size} ${size}`}>
      {children.map((item, index) => (
        <PieSlice
          {...item}
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - padding}
          start={start}
          end={(start += (item.percent * size) / 100)}
          fontSize={fontSize}
          key={index}
        />
      ))}
    </svg>
  );
}
