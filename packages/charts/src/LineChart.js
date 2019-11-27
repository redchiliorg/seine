// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';

import {
  defaultChartDy,
  defaultChartFontSize,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartTitle,
  defaultChartMinValue,
  defaultChartXAxis,
  defaultChartYAxis,
  defaultChartPaletteKey,
  defaultChartVerticalAlignment,
  defaultChartTextAlignment,
} from './constants';
import type { ChartProps } from './types';
import { useGroupedElements } from './helpers';
import ChartLegendItem from './ChartLegendItem';
import LineChartGroup from './LineChartGroup';
import LineChartValue from './LineChartValue';
import ChartTitle from './ChartTitle';
import ChartSvg from './ChartSvg';

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
  paletteKey = defaultChartPaletteKey,
  textAlignment = defaultChartTextAlignment,
  title = defaultChartTitle,
  verticalAlignment = defaultChartVerticalAlignment,
  yAxis = defaultChartYAxis,
  xAxis = defaultChartXAxis,

  as: View = React.Fragment,
  id,
  parent_id,
  size,
  type,
  units,
  ...viewProps
}: Props) {
  fontSize *= 2;

  const height = 79;
  const y = 0;

  const [maxValue, minValue, titles, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  const x = fontSize * `${maxValue}`.length;
  const legendWidth =
    (1 + Math.max(...titles.map(({ title: { length } }) => length))) * fontSize;
  const graphWidth = 297 - legendWidth - 10 - x;

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <ChartSvg
        fontSize={fontSize}
        strokeWidth={0.5}
        verticalAlignment={verticalAlignment}
        viewBox={[
          0,
          -2.5 * lineHeight * fontSize,
          297,
          100 + 3 * lineHeight * fontSize,
        ].join(' ')}
      >
        <marker id="arrowUp" overflow="visible" orient="auto">
          <path
            d="m0 0 3-3-11 3 11 3-3-3z"
            fill="#000000"
            fillRule="evenodd"
            stroke="#000000"
          />
        </marker>

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
                x={x + (index * graphWidth) / (groups.length - 1)}
                y={y + height + fontSize * lineHeight}
              />
            ))
          : null}

        {Array.from({ length: Math.floor((maxValue - minValue) / dy) }).map(
          (_, index, { length }) => [
            (xAxis && index === 0) || (yAxis && index > 0) ? (
              <path
                d={`m${x}  ${y +
                  height -
                  (index * height) / length} ${graphWidth} 0`}
                key={['grid', index]}
                stroke={index > 0 ? '#f0f0f0' : '#505050'}
              />
            ) : null,
            yAxis && index > 0 ? (
              <SvgTypography
                fontWeight={'bold'}
                key={['title', index]}
                textAnchor={'end'}
                x={x - 3 * fontSize}
                y={y + height - (index * height) / length}
              >
                {minValue + index * dy}
                {units}
              </SvgTypography>
            ) : null,
          ]
        )}

        {yAxis ? (
          <path
            d={`m${x} ${y}v${height}`}
            fill="none"
            key="y-axis"
            markerStart="url(#arrowUp)"
            stroke="#000000"
          />
        ) : null}

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
                  x + (index * graphWidth) / (groups.length - 1),
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
                  maxValue={maxValue}
                  minValue={minValue}
                  units={units}
                  value={value}
                  width={3 * fontSize}
                  x={
                    x +
                    (groupIndex * graphWidth) / (groups.length - 1) +
                    fontSize / 2
                  }
                  y={
                    y +
                    height -
                    ((elements
                      .filter((element) => element.id === id)
                      .map(({ value }) => value)[0] || 0) *
                      height) /
                      (maxValue - minValue) -
                    2 * fontSize
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
            width={legendWidth}
            x={297 - legendWidth}
            y={
              y +
              (fontSize * lineHeight) / 2 +
              (10 + fontSize * lineHeight) * titleIndex
            }
          />,
        ])}
      </ChartSvg>
    </View>
  );
}
