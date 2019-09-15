// @flow
import * as React from 'react';
import { splitEvery } from 'ramda';

import {
  defaultChartDy,
  defaultChartFontSize,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartTitle,
} from './constants';
import type { ChartProps } from './types';
import { groupElements, uniqElementTitles } from './helpers';

/**
 * @description Column chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function ColumnChart({
  elements,
  maxValue: initialMaxValue,
  minValue: initialMinValue,

  dy = defaultChartDy,
  fontSize = defaultChartFontSize,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  title = defaultChartTitle,

  barGroupWidth = 66,
  xPadding = 53,

  ...svgProps
}: ChartProps & *) {
  const [maxValue, , titleGroups, groups] = React.useMemo(
    () => [
      dy <= initialMaxValue
        ? initialMaxValue
        : Math.max(...elements.map(({ value }) => value)),
      initialMaxValue > initialMinValue
        ? initialMinValue
        : Math.min(...elements.map(({ value }) => value)),
      splitEvery(3, uniqElementTitles(elements)),
      groupElements(elements),
    ],
    [dy, elements, initialMaxValue, initialMinValue]
  );

  return (
    <svg
      {...svgProps}
      viewBox={[
        0,
        0,
        groups.length > 2 ? 99 * groups.length : 198,
        titleGroups.length ? 210 : 140,
      ].join(' ')}
    >
      {groups.map(([group, elements], index) => (
        <BarGroup
          key={group}
          elements={elements}
          group={group}
          fontSize={1.5 * fontSize}
          index={index}
          lineHeight={lineHeight}
          maxValue={maxValue}
          palette={palette}
          transform={`translate(${index * barGroupWidth})`}
        />
      ))}
      <path
        d={`m${xPadding + 10} ${110}h${66 * groups.length}`}
        stroke={'#000'}
        strokeWidth={0.1}
      />
      <BarGroupYAxis
        dy={dy}
        fontSize={1.5 * fontSize}
        lineHeight={lineHeight}
        maxValue={maxValue}
        title={title}
      />
      {titleGroups.map((titles, index) => (
        <Legend
          key={index}
          fontSize={1.5 * fontSize}
          lineHeight={lineHeight}
          palette={palette.slice(index * 3)}
          titles={titles}
          x={62 + 80 * index}
        />
      ))}
    </svg>
  );
}

// eslint-disable-next-line
function Legend({
  fontSize,
  lineHeight,
  palette,
  titles,

  size = 10,
  x = 62,
  y = 141,
}) {
  const gutter = fontSize * lineHeight;
  return (
    <g fontSize={fontSize}>
      {titles.map((title, index) => (
        <g key={title}>
          <rect
            x={x}
            y={y + (size + gutter) * index}
            width={size}
            height={size}
            fill={palette[index % palette.length]}
          />
          <text x={x + size + gutter} y={y + (size + gutter) * index + gutter}>
            {title}
          </text>
        </g>
      ))}
    </g>
  );
}

// eslint-disable-next-line
function BarGroupYAxis({
  dy,
  fontSize,
  lineHeight,
  maxValue,
  title,

  x = 52,
  y = 20,
  height = 90,
}) {
  return (
    <g fill={'#000000'} textAnchor="middle" fontSize={fontSize}>
      {Array.from({ length: Math.ceil(maxValue / dy) }).map(
        (_, index, { length }) => (
          <text
            key={index}
            x={x + 1}
            y={y + height - (index * height) / length}
          >
            <tspan>{index * dy}</tspan>
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
function BarGroup({
  elements,
  fontSize,
  group,
  index,
  lineHeight,
  maxValue,
  palette,

  x = 80,
  y = 110,
  size = 10,

  ...svgGroupProps
}) {
  return (
    <g {...svgGroupProps}>
      {elements.map(({ value }, index) => (
        <Bar
          key={index}
          fill={palette[index % palette.length]}
          fontSize={fontSize}
          lineHeight={lineHeight}
          maxValue={maxValue}
          value={value}
          x={x + size * index}
          y={y}
          width={size}
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
function Bar({
  fill,
  fontSize,
  lineHeight,
  maxValue,
  value,

  x = 80,
  y = 110,
  width = 10,
  height = 80,
}) {
  const rectHeight = (height * value) / maxValue;

  return (
    <g fill={fill} fontSize={fontSize}>
      <rect x={x} y={y - rectHeight} width={width} height={rectHeight} />
      <text
        x={x}
        y={y - rectHeight - (fontSize * lineHeight) / 2}
        textAnchor="middle"
      >
        <tspan dx={width / 2}>{value}</tspan>
      </text>
    </g>
  );
}
