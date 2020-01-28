// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';

import {
  defaultChartDy,
  defaultChartMinValue,
  defaultChartPalette,
  defaultChartPaletteKey,
  defaultChartTextAlignment,
  defaultChartTitle,
  defaultChartVerticalAlignment,
  defaultChartXAxis,
  defaultChartYAxis,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './constants';
import type { ChartProps } from './types';
import { useGroupedElements } from './helpers';
import ChartLegendItem from './ChartLegendItem';
import ChartTitle from './ChartTitle';
import ChartSvg from './ChartSvg';
import ChartAxis from './ChartAxis';

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
  const [maxValue, minValue, titles, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  const [
    titleMethods,
    titleTypographyMethodsRef,
  ] = useTypographyChildrenMethods(titles.length);
  const legendWidth = 10 + titleMethods.getScaledWidth();

  const [
    valueMethods,
    valueTypographyMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const height = VIEWPORT_HEIGHT / 2 - valueMethods.getScaledHeight();

  const x = 1.4 * valueMethods.getScaledWidth();
  const y = VIEWPORT_HEIGHT / 2;

  const valueHeight = valueMethods.getScaledWidth();

  const graphWidth = VIEWPORT_WIDTH - legendWidth - 10 - x;
  const yScale = valueMethods.getYScale();

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <ChartSvg
        strokeWidth={valueHeight / 40}
        verticalAlignment={verticalAlignment}
        viewBox={`0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`}
      >
        {xAxis
          ? groups.map(([group], index, { length }) => (
              <SvgTypography
                key={['group', index]}
                dominantBaseline={'hanging'}
                textAnchor={'middle'}
                x={x + (index * graphWidth) / (length - 1)}
                y={y + height}
              >
                {group}
              </SvgTypography>
            ))
          : null}
        {xAxis || yAxis
          ? Array.from({ length: Math.floor((maxValue - minValue) / dy) }).map(
              (_, index, { length }) =>
                !!((xAxis && index === 0) || (yAxis && index > 0)) && (
                  <path
                    d={`m${x}  ${y +
                      height -
                      (index * height) / length} ${graphWidth} 0`}
                    key={['grid', index]}
                    stroke={index > 0 ? '#f0f0f0' : 'black'}
                  />
                )
            )
          : null}
        {yAxis ? (
          <ChartAxis
            arrow
            direction={'up'}
            length={height}
            max={maxValue}
            min={minValue}
            step={Math.max(dy, valueHeight)}
            y={y + height}
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
                <SvgTypography
                  index={index}
                  key={['value', titleIndex, groupIndex]}
                  textAnchor={
                    groupIndex === groups.length - 1
                      ? 'end'
                      : groupIndex > 0
                      ? 'middle'
                      : 'start'
                  }
                  x={
                    x +
                    (groupIndex === 0 && valueMethods.getScaledWidth() / 4) +
                    (groupIndex * graphWidth) / (groups.length - 1)
                  }
                  y={
                    y +
                    height -
                    ((elements
                      .filter((element) => element.id === id)
                      .map(({ value }) => value)[0] || 0) *
                      height) /
                      (maxValue - minValue) -
                    1
                  }
                  ref={valueTypographyMethodsRef}
                >
                  {value}
                  {units}
                </SvgTypography>
              ))
          ),

          <ChartLegendItem
            fill={palette[titleIndex % palette.length]}
            key={id}
            ref={titleTypographyMethodsRef}
            size={10}
            title={title}
            width={legendWidth}
            x={x + graphWidth + 8}
            y={
              y +
              titleMethods.getScaledHeight() * yScale +
              3 * yScale +
              11 * titleIndex
            }
          />,
        ])}
      </ChartSvg>
    </View>
  );
}
