// @flow
import * as React from 'react';
import {
  Canvas,
  ForeignObject,
  SvgTypography,
  useSvgScale,
  useTextMetrics,
} from '@seine/styles';

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

  const [xScale, yScale, svgRef] = useSvgScale();

  const canvasRef = React.useRef(null);
  const { current: canvas } = canvasRef;

  let [groupHeight, groupWidth] = useTextMetrics(
    `${groups.reduce(
      (found, { title }) =>
        `${title}`.length > found.length ? `${title}` : found,
      ''
    )}`,
    canvas
  );
  groupWidth *= xScale;

  const height = VIEWPORT_HEIGHT / 2 - groupHeight * yScale;

  const [titleWidth, titleHeight] = useTextMetrics(
    `${titles.reduce(
      (found, { title }) =>
        `${title}`.length > found.length ? `${title}` : found,
      ''
    )}`,
    canvas
  );
  const legendWidth = 10 + titleWidth * xScale;

  let [valueWidth, valueHeight] = useTextMetrics(
    `${elements.reduce(
      (found, { value }) =>
        `${value}`.length > found.length ? `${value}` : found,
      ''
    )} `,
    canvas
  );
  valueWidth *= xScale;
  valueHeight *= yScale;
  const x = 3 * valueWidth;
  const y = VIEWPORT_HEIGHT / 2;

  const graphWidth = VIEWPORT_WIDTH - legendWidth - 15 - x;

  const maxGroupsCount = parseInt(graphWidth / groupWidth);

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <ChartSvg
        strokeWidth={2 * yScale}
        verticalAlignment={verticalAlignment}
        viewBox={'landscape'}
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
          ? (maxGroupsCount < groups.length
              ? [
                  ...groups.slice(0, parseInt(maxGroupsCount / 2)),
                  ...(maxGroupsCount % 2
                    ? []
                    : [groups[parseInt(maxGroupsCount / 2)]]),
                  ...groups.slice(-parseInt(maxGroupsCount / 2)),
                ]
              : groups
            ).map(([group], index, { length }) => (
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
            direction={'up'}
            length={height}
            max={maxValue}
            min={minValue}
            step={Math.max(dy, valueHeight)}
            x={x}
            y={y + height}
          />
        ) : null}
        {yAxis ? (
          <path
            d={`m${x} ${y}v${height * yScale}`}
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
                    (groupIndex === 0 && valueWidth / 4) +
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
                >
                  {value}
                  {units}
                </SvgTypography>
              ))
          ),

          <ChartLegendItem
            fill={palette[titleIndex % palette.length]}
            key={id}
            size={10}
            title={title}
            width={legendWidth}
            x={x + graphWidth + 8}
            y={y + titleHeight * yScale + 3 * yScale + 11 * titleIndex}
          />,
        ])}
        <ForeignObject ref={svgRef} height={'100%'} width={'100%'}>
          <Canvas ref={canvasRef} />
        </ForeignObject>
      </ChartSvg>
    </View>
  );
}
