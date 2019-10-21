// @flow
import * as React from 'react';

import {
  defaultChartDx,
  defaultChartFontSize,
  defaultChartFontWeight,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartPaletteKey,
  defaultChartSize,
  defaultChartTitle,
  defaultChartUnits,
  defaultChartXAxis,
} from './constants';
import type { ChartProps } from './types';
import BarChartElementTitle from './BarChartElementTitle';
import BarChartElementValue from './BarChartElementValue';
import ChartTitle from './ChartTitle';

type Props = $Rest<ChartProps, {| kind: string |}>;

/**
 * @description Bar chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function BarChart({
  elements,

  dx = defaultChartDx,
  fontWeight = defaultChartFontWeight,
  fontSize = defaultChartFontSize,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  paletteKey = defaultChartPaletteKey,
  size = defaultChartSize,
  title = defaultChartTitle,
  units = defaultChartUnits,
  xAxis = defaultChartXAxis,

  as: View = React.Fragment,
  id,
  parent_id,
  type,
  ...viewProps
}: Props) {
  const { barHeight, fontHeight, fontWidth } = React.useMemo(() => {
    return {
      barHeight: fontSize * 6,
      fontHeight: fontSize * lineHeight,
      fontWidth: fontSize / 2,
      textPadding: fontSize,
    };
  }, [fontSize, lineHeight]);

  const titleMaxLen =
    Math.max(...elements.map(({ title }) => title.length)) * fontWidth;
  const valueMaxLen =
    Math.max(...elements.map(({ value }) => `${value}`.length)) * fontWidth;

  const barMaxLen = size - (titleMaxLen + valueMaxLen + fontSize * 2);
  const maxValue = Math.max(...elements.map(({ value }) => value));

  const height = (elements.length * barHeight) / 2;

  return (
    <View {...viewProps}>
      <ChartTitle>{title}</ChartTitle>
      <svg
        fontSize={fontSize}
        fontWeight={fontWeight}
        height={'auto'}
        preserveAspectRatio={'xMidYMax meet'}
        viewBox={[
          0,
          -2 * lineHeight * fontSize,
          size,
          height + 3.5 * lineHeight * fontSize,
        ].join(' ')}
        width={'100%'}
      >
        {elements.map(({ title, value }, index) => {
          const len = (barMaxLen * value) / maxValue;
          const color = palette[index % palette.length];
          const y = (index * barHeight) / 2;

          return [
            <BarChartElementTitle
              fill={color}
              height={barHeight}
              index={index}
              key={'title'}
              lineHeight={fontHeight}
              x={0}
              y={y}
              width={titleMaxLen}
            >
              {title}
            </BarChartElementTitle>,

            <BarChartElementValue
              fill={color}
              height={barHeight}
              index={index}
              key={'value'}
              lineHeight={fontHeight}
              x={titleMaxLen + len + 1.5 * fontSize}
              y={y}
              units={units}
              width={valueMaxLen}
            >
              {value}
            </BarChartElementValue>,

            <rect
              fill={color}
              height={barHeight / 2}
              key={['bar', index]}
              width={len}
              x={titleMaxLen + fontSize}
              y={y}
            />,
          ];
        })}
        {xAxis
          ? Array.from({ length: Math.floor(maxValue / dx) }).map(
              (_, index, { length }) => [
                <line
                  key={['line', index]}
                  x1={titleMaxLen + fontSize + (barMaxLen * index) / length}
                  x2={
                    titleMaxLen + fontSize + (barMaxLen * (index + 1)) / length
                  }
                  y1={(elements.length * barHeight) / 2}
                  y2={(elements.length * barHeight) / 2}
                  stroke={'black'}
                  strokeWidth={'0.1em'}
                />,
                <text
                  fontWeight={'bold'}
                  key={['title', index]}
                  textAnchor={'middle'}
                  x={titleMaxLen + (barMaxLen * (index + 1)) / length}
                  y={(elements.length * barHeight) / 2 + fontSize * lineHeight}
                >
                  {(index + 1) * dx}
                  {units}
                </text>,
              ]
            )
          : null}
      </svg>
    </View>
  );
}
