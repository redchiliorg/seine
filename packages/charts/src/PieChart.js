// @flow
import * as React from 'react';

import {
  defaultChartFontSize,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartSize,
  defaultChartUnits,
} from './constants';
import type { ChartProps } from './types';
import PieChartTitle from './PieChartTitle';
import PieChartValue from './PieChartValue';
import PieChartSlice from './PieChartSlice';

type Props = $Rest<ChartProps, {| kind: string |}>;

/**
 * @description Pie chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function PieChart({
  elements,
  fontSize = defaultChartFontSize,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  size = defaultChartSize,
  units = defaultChartUnits,

  as: View = 'svg',
  id,
  parent_id,
  type,
  ...viewProps
}): Props {
  const sum = React.useMemo(
    () => elements.reduce((acc, { value }) => acc + value, 0),
    [elements]
  );

  const [radius, outerRadius, innerRadius, center, quarter] = React.useMemo(
    () => [
      size / 2 - size / 6,
      size / 2 - size / 6 + size / 9,
      size / 6,
      size / 2,
      sum / 4,
    ],
    [size, sum]
  );

  let end = (3 * Math.PI) / 4;
  let endX = Math.cos(end);
  let endY = Math.sin(end);

  return (
    <View viewBox={[0, 0, size, size].join(' ')} {...viewProps}>
      {elements.map(({ title, value }, index) => {
        const start = end;
        const startX = endX;
        const startY = endY;
        const length = (2 * value * Math.PI) / sum;

        end = start + length;
        endX = Math.cos(end);
        endY = Math.sin(end);

        const textColor = value >= quarter ? 'white' : 'black';
        const textX =
          center +
          (value >= quarter ? innerRadius : outerRadius) *
            Math.cos(start + length / 2);
        const textY =
          center +
          (value >= quarter ? innerRadius : outerRadius) *
            Math.sin(start + length / 2);

        return [
          <PieChartSlice
            center={center}
            fontSize={fontSize}
            endX={endX}
            endY={endY}
            index={index}
            key={'slice'}
            length={length}
            lineHeight={lineHeight}
            palette={palette}
            radius={radius}
            start={start}
            startX={startX}
            startY={startY}
            textX={textX}
            textY={textY}
          />,

          <PieChartValue
            fill={textColor}
            fontSize={2 * fontSize}
            index={index}
            key={'value'}
            lineHeight={lineHeight}
            units={units}
            value={value}
            width={2 * fontSize * String(value).length}
            x={textX}
            y={textY}
          />,

          <PieChartTitle
            fill={textColor}
            fontSize={1.5 * fontSize}
            index={index}
            key={'title'}
            lineHeight={lineHeight}
            title={title}
            width={1.5 * fontSize * title.length}
            x={textX}
            y={fontSize * lineHeight + textY}
          />,
        ];
      })}
    </View>
  );
}
