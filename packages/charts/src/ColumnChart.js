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
import { groupElements, uniqElementTitles } from './helpers';
import ColumnChartLegend from './ColumnChartLegend';

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
  barGroupWidth = 66,
  xPadding = 23,

  id,
  parent_id,
  size,
  type,

  ...viewProps
}: Props) {
  const [maxValue, minValue, titles, groups] = React.useMemo(() => {
    const maxValue =
      dy <= initialMaxValue
        ? initialMaxValue
        : Math.max(...elements.map(({ value }) => value));
    return [
      maxValue,
      maxValue > initialMinValue
        ? initialMinValue
        : Math.min(...elements.map(({ value }) => value)),
      uniqElementTitles(elements),
      groupElements(elements),
    ];
  }, [dy, elements, initialMaxValue, initialMinValue]);

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
            <ChartColumnGroup
              key={index}
              elements={elements}
              fontSize={1.5 * fontSize}
              group={group}
              index={index}
              lineHeight={lineHeight}
              minValue={minValue}
              maxValue={maxValue}
              palette={palette}
              transform={`translate(${index * barGroupWidth})`}
              x={xPadding * 2}
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
      {titles.map((title, index) => (
        <ColumnChartLegend
          key={index}
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
      {Array.from({ length: Math.floor((maxValue - minValue) / dy) + 1 }).map(
        (_, index, { length }) => (
          <text
            key={index}
            x={x + 1}
            y={y + height - (index * height) / length}
          >
            <tspan>{minValue + index * dy}</tspan>
          </text>
        )
      )}
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

// eslint-disable-next-line
function ChartColumnGroup({
  elements,
  fontSize,
  group,
  index,
  lineHeight,
  minValue,
  maxValue,
  palette,

  size = 10,
  x = 80,
  y = 110,

  ...svgGroupProps
}) {
  return (
    <g {...svgGroupProps}>
      {elements.map(({ value }, index) => (
        <ChartColumn
          key={index}
          fill={palette[index % palette.length]}
          fontSize={fontSize}
          lineHeight={lineHeight}
          minValue={minValue}
          maxValue={maxValue}
          value={value}
          width={size}
          x={x + size * index}
          y={y}
        />
      ))}
      <text
        fontSize={1.5 * fontSize}
        textAnchor={'middle'}
        x={x + (size * elements.length) / 2}
        y={y + 1.5 * fontSize * lineHeight}
      >
        {group}
      </text>
    </g>
  );
}

// eslint-disable-next-line
function ChartColumn({
  fill,
  fontSize,
  lineHeight,
  maxValue,
  minValue,
  value,

  height = 80,
  width = 10,
  x = 80,
  y = 110,
}) {
  const rectHeight = (height * value) / (maxValue - minValue);
  const dy = (height * minValue) / (maxValue - minValue);

  return (
    <g fill={fill} fontSize={fontSize}>
      <rect
        x={x}
        y={dy + y - rectHeight}
        width={width}
        height={rectHeight - dy}
      />
      <text
        x={x}
        y={Math.min(dy + y - rectHeight, y) - (fontSize * lineHeight) / 2}
        textAnchor="middle"
      >
        <tspan dx={width / 2}>
          {value < minValue
            ? `< ${minValue}`
            : value > maxValue
            ? `> ${maxValue}`
            : value}
        </tspan>
      </text>
    </g>
  );
}
