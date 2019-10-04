// @flow
import * as React from 'react';

import {
  defaultChartDy,
  defaultChartFontSize,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartTitle,
  defaultChartMinValue,
  defaultChartXAxis,
  defaultChartYAxis,
} from './constants';
import type { ChartProps } from './types';
import { useGroupedElements } from './helpers';
import ChartLegendItem from './ChartLegendItem';
import LineChartGroup from './LineChartGroup';
import LineChartValue from './LineChartValue';

type Props = $Rest<ChartProps, {| kind: string |}> & {
  as?: React.ElementType,
};

/**
 * @description Column chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function LineChart({
  elements,
  maxValue: initialMaxValue,
  minValue: initialMinValue = defaultChartMinValue,

  dy = defaultChartDy,
  fontSize = defaultChartFontSize,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  title = defaultChartTitle,
  xAxis = defaultChartXAxis,
  yAxis = defaultChartYAxis,

  as: View = 'svg',
  id,
  parent_id,
  size,
  type,
  ...viewProps
}: Props) {
  fontSize *= 2;

  const height = 86;
  const width = 195;
  const x = 20;
  const y = 7;

  const [maxValue, minValue, titles, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  return (
    <View
      fontSize={fontSize}
      height={'100%'}
      strokeWidth={0.5}
      viewBox={[0, 0, 297, 100].join(' ')}
      width={'100%'}
      {...viewProps}
    >
      <text
        fontSize={'1.5em'}
        fontWeight={'bold'}
        key={'title'}
        x={x}
        y={y - (1.5 + 0.5) * fontSize}
      >
        {title}
      </text>

      <marker id="arrowUp" overflow="visible" orient="auto">
        <path
          d="m0 0 3-3-11 3 11 3-3-3z"
          fill="#00ff00"
          fillRule="evenodd"
          stroke="#0f0"
        />
      </marker>
      {yAxis ? (
        <path
          d={`m${x} ${y}v${height}`}
          fill="none"
          key="y-axis"
          markerStart="url(#arrowUp)"
          stroke="#00ff00"
        />
      ) : null}

      {xAxis
        ? groups.map(([group], index) => (
            <LineChartGroup
              fontSize={fontSize}
              fontWeight={'bold'}
              group={group}
              height={fontSize * lineHeight}
              key={index}
              lineHeight={lineHeight}
              width={8 * fontSize}
              x={x + (index * width) / (groups.length - 1)}
              y={y + height + fontSize * lineHeight}
            />
          ))
        : null}

      {Array.from({ length: Math.floor((maxValue - minValue) / dy) }).map(
        (_, index, { length }) => [
          (xAxis && index === 0) || (yAxis && index > 0) ? (
            <path
              d={`m${x}  ${y + height - (index * height) / length} ${width} 0`}
              key={['grid', index]}
              stroke={index > 0 ? '#f0f0f0' : '#505050'}
            />
          ) : null,
          yAxis && index > 0 ? (
            <text
              fontWeight={'bold'}
              key={['title', index]}
              textAnchor={'end'}
              x={x - fontSize}
              y={y + height - (index * height) / length + fontSize / 2}
            >
              {minValue + index * dy}
            </text>
          ) : null,
        ]
      )}

      {titles.map(({ id, title }, titleIndex) => [
        <marker
          key={['point', titleIndex]}
          id={['point', titleIndex]}
          overflow="visible"
          orient="auto"
        >
          <circle
            cx={0}
            r={3}
            stroke={'none'}
            fill={palette[titleIndex % palette.length]}
          />
        </marker>,

        <path
          d={groups.reduce(
            (acc, [, elements], index) =>
              [
                acc,
                x + (index * width) / (groups.length - 1),
                y +
                  height -
                  ((elements
                    .filter((element) => element.id === id)
                    .map(({ value }) => value)[0] || 0) *
                    height) /
                    (maxValue - minValue),
              ].join(' '),
            'M'
          )}
          fill={'none'}
          key={['line', titleIndex]}
          markerEnd={`url(#${['point', titleIndex]})`}
          markerMid={`url(#${['point', titleIndex]})`}
          markerStart={`url(#${['point', titleIndex]})`}
          stroke={palette[titleIndex % palette.length]}
        />,

        ...groups.map(([, elements], groupIndex) =>
          elements
            .filter((element) => element.id === id)
            .map(({ index, value }) => (
              <LineChartValue
                fontSize={fontSize}
                height={2 * fontSize * lineHeight}
                index={index}
                key={['value', titleIndex, groupIndex]}
                lineHeight={lineHeight}
                value={value}
                width={3 * fontSize}
                x={x + (groupIndex * width) / (groups.length - 1)}
                y={
                  y +
                  height -
                  ((elements
                    .filter((element) => element.id === id)
                    .map(({ value }) => value)[0] || 0) *
                    height) /
                    (maxValue - minValue) -
                  fontSize
                }
              />
            ))
        ),

        <ChartLegendItem
          fill={palette[titleIndex % palette.length]}
          fontSize={fontSize}
          key={id}
          lineHeight={lineHeight}
          size={10}
          title={title}
          width={297 - width}
          x={x + width + 10 + fontSize}
          y={
            y +
            (fontSize * lineHeight) / 2 +
            (10 + fontSize * lineHeight) * titleIndex
          }
        />,
      ])}
    </View>
  );
}
