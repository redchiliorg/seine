// @flow
import * as React from 'react';

import {
  defaultChartDy,
  defaultChartFontSize,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartTitle,
  defaultMinValue,
} from './constants';
import type { ChartProps } from './types';
import { useGroupedElements } from './helpers';
import ChartLegendItem from './ChartLegendItem';
import ColumnChartGroup from './ColumnChartGroup';

type Props = $Rest<ChartProps, {| kind: string |}> & {
  as?: React.ElementType,
};

/**
 * @description Column chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function ColumnChart({
  elements,
  maxValue: initialMaxValue,
  minValue: initialMinValue = defaultMinValue,

  dy = defaultChartDy,
  fontSize = defaultChartFontSize,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  title = defaultChartTitle,

  as: View = 'svg',
  id,
  parent_id,
  size,
  type,
  ...viewProps
}: Props) {
  const barGroupWidth = 66;
  const xPadding = 23;
  const [maxValue, minValue, titles, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  return (
    <View
      viewBox={React.useMemo(
        () =>
          [
            0,
            0,
            groups.length > 2
              ? 79 * groups.length
              : groups.length === 2
              ? 99 * groups.length
              : 128,
            titles.length ? 210 : 140,
          ].join(' '),
        [groups.length, titles.length]
      )}
      height={'100%'}
      width={'100%'}
      {...viewProps}
    >
      {React.useMemo(
        () =>
          groups.map(([group, elements], index) => (
            <ColumnChartGroup
              key={index}
              barGroupWidth={barGroupWidth}
              elements={elements}
              fontSize={1.5 * fontSize}
              group={group}
              height={80}
              lineHeight={lineHeight}
              minValue={minValue}
              maxValue={maxValue}
              palette={palette}
              size={10}
              width={10}
              x={xPadding * 2 + index * barGroupWidth}
              y={110}
            />
          )),
        [
          barGroupWidth,
          fontSize,
          groups,
          lineHeight,
          maxValue,
          minValue,
          palette,
          xPadding,
        ]
      )}
      <path
        d={`m${xPadding + 20} ${110}h${barGroupWidth * groups.length -
          (groups.length > 1 ? 10 * (6 - titles.length) : 0)}`}
        stroke={'#000'}
        strokeWidth={0.1}
      />
      <BarGroupYAxis
        dy={dy}
        fontSize={1.5 * fontSize}
        lineHeight={lineHeight}
        maxValue={maxValue}
        minValue={minValue}
        title={title}
        x={xPadding}
      />
      {titles.map(({ id, title }, index) => (
        <ChartLegendItem
          key={id}
          fill={palette[index % palette.length]}
          fontSize={1.5 * fontSize}
          lineHeight={lineHeight}
          size={10}
          title={title}
          width={80}
          x={xPadding + 10 + 13 + barGroupWidth * (index % groups.length)}
          y={
            141 + (10 + fontSize * lineHeight) * parseInt(index / groups.length)
          }
        />
      ))}
    </View>
  );
}

// eslint-disable-next-line
function BarGroupYAxis({
  dy,
  fontSize,
  lineHeight,
  maxValue,
  minValue,
  title,
  x,

  height = 90,
  y = 20,
}) {
  return (
    <g fill={'#000000'} textAnchor="middle" fontSize={fontSize}>
      {Array.from({
        length: dy > 0 ? Math.floor((maxValue - minValue) / dy) + 1 : 0,
      }).map((_, index, { length }) => (
        <text key={index} x={x + 1} y={y + height - (index * height) / length}>
          <tspan>{minValue + index * dy}</tspan>
        </text>
      ))}
      <text
        x={x - lineHeight * 2 * fontSize}
        y={y + height / 2}
        fontSize={'2em'}
        writingMode="vertical-lr"
      >
        {title}
      </text>
    </g>
  );
}
