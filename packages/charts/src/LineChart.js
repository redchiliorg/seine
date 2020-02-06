// @flow
import * as React from 'react';
import {
  FlexBox,
  SvgTypography,
  useTypographyChildrenMethods,
} from '@seine/styles';

import {
  defaultChartDy,
  defaultChartMinValue,
  defaultChartPalette,
  defaultChartPaletteKey,
  defaultChartTextAlignment,
  defaultChartTitle,
  defaultChartXAxis,
  defaultChartYAxis,
  defaultChartLegend,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './constants';
import type { ChartProps } from './types';
import { useGroupedElements } from './helpers';
import ChartTitle from './ChartTitle';
import ChartSvg from './ChartSvg';
import ChartAxis from './ChartAxis';
import ChartLegend from './ChartLegend';

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
  legend = defaultChartLegend,
  palette = defaultChartPalette,
  paletteKey = defaultChartPaletteKey,
  textAlignment = defaultChartTextAlignment,
  title = defaultChartTitle,
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
    valueMethods,
    valueTypographyMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const height = (7 * VIEWPORT_HEIGHT) / 8 - valueMethods.getScaledHeight();

  const x = 1.4 * valueMethods.getScaledWidth();
  const y = VIEWPORT_HEIGHT / 8 + valueMethods.getScaledHeight();

  const valueHeight = valueMethods.getScaledHeight();
  const valueWidth = valueMethods.getScaledWidth();

  const textHeight = valueMethods.getHeight();

  const graphWidth = VIEWPORT_WIDTH - x - valueWidth;

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <FlexBox height={`calc(100% - ${2 * textHeight}px)`} width={'auto'}>
        <ChartSvg
          strokeWidth={valueHeight / 40}
          viewBox={`0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`}
        >
          {xAxis
            ? groups.map(([group], index, { length }) => (
                <React.Fragment key={index}>
                  <SvgTypography
                    dominantBaseline={'hanging'}
                    key={'group'}
                    textAnchor={'middle'}
                    x={x + (index * graphWidth) / (length - 1)}
                    y={y + height}
                    width={graphWidth / length}
                  >
                    {group}
                  </SvgTypography>
                </React.Fragment>
              ))
            : null}
          {xAxis || yAxis
            ? Array.from({
                length: Math.floor((maxValue - minValue) / dy),
              }).map(
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

            ...groups.map(([, elements], groupIndex, { length }) =>
              elements
                .filter((element) => element.id === id)
                .map(({ index, value }) => (
                  <SvgTypography
                    key={`value.${index}`}
                    textAnchor={
                      groupIndex === groups.length - 1
                        ? 'end'
                        : groupIndex > 0
                        ? 'middle'
                        : 'start'
                    }
                    x={x + (groupIndex * graphWidth) / (length - 1)}
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
                    width={graphWidth / (length + 1)}
                    ref={valueTypographyMethodsRef}
                  >
                    {groupIndex === 0 && ' '}
                    {value}
                    {units}
                  </SvgTypography>
                ))
            ),
          ])}
        </ChartSvg>
      </FlexBox>

      <FlexBox width={'auto'} height={2 * textHeight}>
        {legend && (
          <ChartLegend palette={palette} size={textHeight} elements={titles} />
        )}
      </FlexBox>
    </View>
  );
}
