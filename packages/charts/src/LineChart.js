// @flow
import * as React from 'react';
import {
  Canvas,
  ForeignObject,
  SvgTypography,
  useSvgScale,
  useTextMetrics,
} from '@seine/styles';
import styled, { css } from 'styled-components/macro';

import {
  defaultChartDy,
  defaultChartFontSize,
  defaultChartLineHeight,
  defaultChartMinValue,
  defaultChartPalette,
  defaultChartPaletteKey,
  defaultChartTextAlignment,
  defaultChartTitle,
  defaultChartVerticalAlignment,
  defaultChartXAxis,
  defaultChartYAxis,
} from './constants';
import type { ChartProps } from './types';
import { useGroupedElements } from './helpers';
import ChartLegendItem from './ChartLegendItem';
import ChartTitle from './ChartTitle';
import ChartSvg from './ChartSvg';

type Props = $Rest<ChartProps, {| kind: string |}> & {
  as?: React.ElementType,
};

const LineChartText = styled(SvgTypography)`
  ${({
    theme: {
      breakpoints,
      typography: { body2 },
    },
    width,
  }) => css`
    ${breakpoints.down('md')} {
      ${body2};
      ${width &&
        css`
          max-width: ${width}px;
        `}
    }
  `}
`;

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

  const [maxValue, minValue, titles, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  const [{ xScale, yScale }, svgRef] = useSvgScale();

  const canvasRef = React.useRef(null);
  const { current: canvas } = canvasRef;

  const groupMetrics = useTextMetrics(
    `${groups.reduce(
      (found, { title }) =>
        `${title}`.length > found.length ? `${title}` : found,
      ''
    )}`,
    canvas
  );
  const height = 79 + groupMetrics.height * yScale;

  const titleMetrics = useTextMetrics(
    `${titles.reduce(
      (found, { title }) =>
        `${title}`.length > found.length ? `${title}` : found,
      ''
    )}`,
    canvas
  );
  const legendWidth = 10 + titleMetrics.width * xScale;

  const valueMetrics = useTextMetrics(
    `${elements.reduce(
      (found, { value }) =>
        `${value}`.length > found.length ? `${value}` : found,
      ''
    )}`,
    canvas
  );
  const x = valueMetrics.width * xScale;

  const graphWidth = 297 - legendWidth - 10 - x;

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <ChartSvg
        strokeWidth={2 * yScale}
        verticalAlignment={verticalAlignment}
        viewBox={`0 0 297 ${height + groupMetrics.height * yScale}`}
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
              <LineChartText
                key={['group', index]}
                dominantBaseline={'hanging'}
                textAnchor={'middle'}
                x={x + (index * graphWidth) / (groups.length - 1)}
                y={height}
              >
                {group}
              </LineChartText>
            ))
          : null}
        {Array.from({ length: Math.floor((maxValue - minValue) / dy) }).map(
          (_, index, { length }) => [
            (xAxis && index === 0) || (yAxis && index > 0) ? (
              <path
                d={`m${x}  ${height -
                  (index * height) / length} ${graphWidth} 0`}
                key={['grid', index]}
                stroke={index > 0 ? '#f0f0f0' : 'black'}
              />
            ) : null,
            yAxis && index > 0 ? (
              <LineChartText
                dominantBaseline={'middle'}
                fontWeight={'bold'}
                key={['title', index]}
                textAnchor={'end'}
                x={x}
                y={height - (index * height) / length}
              >
                {minValue + index * dy}
                {units}
                {'  '}
              </LineChartText>
            ) : null,
          ]
        )}
        {yAxis ? (
          <path
            d={`m${x} 0v${height}`}
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
                <LineChartText
                  index={index}
                  key={['value', titleIndex, groupIndex]}
                  textAnchor={
                    groupIndex === groups.length - 1
                      ? 'end'
                      : groupIndex > 0
                      ? 'middle'
                      : 'start'
                  }
                  x={x + (groupIndex * graphWidth) / (groups.length - 1)}
                  y={
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
                </LineChartText>
              ))
          ),

          <ChartLegendItem
            fill={palette[titleIndex % palette.length]}
            key={id}
            size={10}
            title={title}
            width={legendWidth}
            x={297 - legendWidth}
            y={
              titleMetrics.height * yScale +
              3 * yScale +
              (10 + fontSize * lineHeight) * titleIndex
            }
          />,
        ])}
        <ForeignObject ref={svgRef} height={'100%'} width={'100%'}>
          <Canvas ref={canvasRef} variant={'h5'} />
        </ForeignObject>
      </ChartSvg>
    </View>
  );
}
