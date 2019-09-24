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
import { groupElements, titleIdentityElements } from './helpers';
import ChartLegendItem from './ChartLegendItem';

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
  fontSize *= 2;

  const height = 86;
  const width = 195;
  const x = 20;
  const y = 58;
  const yAxisColor = '#00ff00';

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
      titleIdentityElements(elements),
      groupElements(elements),
    ];
  }, [dy, elements, initialMaxValue, initialMinValue]);

  return (
    <View
      fontSize={fontSize}
      height={'100%'}
      strokeWidth={0.5}
      viewBox={[0, 0, 297, 210].join(' ')}
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
          transform="scale(0.6) translate(3.6)"
          d="m0 0 5-5-18 5 18 5-5-5z"
          fill={yAxisColor}
          fillRule="evenodd"
          stroke="#0f0"
        />
      </marker>
      <path
        d={`m${x} ${y}v${height}`}
        fill="none"
        key={'y-axis'}
        markerStart="url(#arrowUp)"
        stroke={yAxisColor}
      />

      {}

      {groups.map(([title], index) => (
        <text
          fill="#000000"
          fontWeight={'bold'}
          key={title}
          textAnchor={'middle'}
          x={x + (index * width) / (groups.length - 1)}
          y={y + height + fontSize * lineHeight}
        >
          {title}
        </text>
      ))}

      {Array.from({ length: Math.floor((maxValue - minValue) / dy) }).map(
        (_, index, { length }) => [
          <path
            d={`m${x}  ${y + height - (index * height) / length} ${width} 0`}
            key={['grid', index]}
            stroke={index > 0 ? '#f0f0f0' : '#505050'}
          />,
          index > 0 ? (
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

      {titles.map(({ id, title }, index) => [
        <marker
          key={['point', title]}
          id={['point', title]}
          overflow="visible"
          orient="auto"
        >
          <circle
            cx={0}
            r={3}
            stroke={'none'}
            fill={palette[index % palette.length]}
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
          key={['path', title]}
          markerEnd={`url(#${['point', title]})`}
          markerMid={`url(#${['point', title]})`}
          markerStart={`url(#${['point', title]})`}
          stroke={palette[index % palette.length]}
        />,

        <ChartLegendItem
          fill={palette[index % palette.length]}
          fontSize={fontSize}
          key={['legend', title]}
          lineHeight={lineHeight}
          size={10}
          title={title}
          width={80}
          x={x + width + 10}
          y={
            y +
            (fontSize * lineHeight) / 2 +
            (10 + fontSize * lineHeight) * index
          }
        />,
      ])}
    </View>
  );
}
