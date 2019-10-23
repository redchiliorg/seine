// @flow
import * as React from 'react';

import {
  defaultChartFontSize,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartPaletteKey,
  defaultChartSize,
  defaultChartTitle,
  defaultPieChartUnits,
} from './constants';
import type { ChartProps } from './types';
import PieChartTitle from './PieChartTitle';
import PieChartValue from './PieChartValue';
import PieChartSlice from './PieChartSlice';
import ChartTitle from './ChartTitle';

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
  paletteKey = defaultChartPaletteKey,
  size = defaultChartSize,
  title = defaultChartTitle,
  units = defaultPieChartUnits,
  as: View = React.Fragment,
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
    () => [size / 2, size / 2 + size / 9, size / 6, size / 2, sum / 4],
    [size, sum]
  );

  const [viewBox, setViewBox] = React.useState(`0 0 ${size} ${size}`);

  const boundsRef = React.useRef({ minX: 0, minY: 0, maxX: size, maxY: size });
  React.useLayoutEffect(() => {
    const {
      current: { minX, minY, maxX, maxY },
    } = boundsRef;
    setViewBox(`${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
  }, [elements]);

  let end = (3 * Math.PI) / 4;
  let endX = Math.cos(end);
  let endY = Math.sin(end);

  const { current: bounds } = boundsRef;

  bounds.minX = bounds.minY = 0;
  bounds.maxX = bounds.maxY = size;

  return (
    <View {...viewProps}>
      <ChartTitle>{title}</ChartTitle>
      <svg
        overflow={'visible'}
        preserveAspectRatio={'xMinYMin meet'}
        viewBox={viewBox}
        width={'100%'}
        height={'auto'}
      >
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

          const titleWidth = fontSize * (2 + title.length);
          const valueWidth = fontSize * (2 + String(value).length);
          const textBoxWidth = Math.max(titleWidth, valueWidth);
          const textBoxHeight = 1.5 * fontSize * lineHeight;

          if (textX - textBoxWidth / 2 < bounds.minX) {
            bounds.minX = textX - textBoxWidth / 2;
          }
          if (textX > bounds.maxX + textBoxWidth / 2) {
            bounds.maxX = textX + textBoxWidth / 2;
          }
          if (textY - 2 * fontSize < bounds.minY) {
            bounds.minY = textY - 2 * fontSize;
          }
          if (textY + textBoxHeight > bounds.maxY) {
            bounds.maxY = textY + textBoxHeight;
          }
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
              width={valueWidth}
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
              width={titleWidth}
              x={textX}
              y={fontSize * lineHeight + textY}
            />,
          ];
        })}
      </svg>
    </View>
  );
}
