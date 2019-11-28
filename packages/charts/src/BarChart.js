// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';

import {
  defaultChartDx,
  defaultChartFontSize,
  defaultChartFontWeight,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartPaletteKey,
  defaultChartSize,
  defaultChartTextAlignment,
  defaultChartTitle,
  defaultChartUnits,
  defaultChartVerticalAlignment,
  defaultChartXAxis,
} from './constants';
import type { ChartProps } from './types';
import BarChartElementTitle from './BarChartElementTitle';
import BarChartElementValue from './BarChartElementValue';
import ChartTitle from './ChartTitle';
import ChartSvg from './ChartSvg';

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
  textAlignment = defaultChartTextAlignment,
  title = defaultChartTitle,
  units = defaultChartUnits,
  verticalAlignment = defaultChartVerticalAlignment,
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
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <ChartSvg
        fontSize={fontSize}
        fontWeight={fontWeight}
        verticalAlignment={verticalAlignment}
        viewBox={[
          0,
          -2 * lineHeight * fontSize,
          size,
          height + 3.5 * lineHeight * fontSize,
        ].join(' ')}
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
              x={titleMaxLen + len + 4}
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
                <SvgTypography
                  key={['title', index]}
                  dominantBaseline={'hanging'}
                  textAnchor={'middle'}
                  x={titleMaxLen + (barMaxLen * (index + 1)) / length}
                  y={(elements.length * barHeight) / 2}
                  variant={'h5'}
                >
                  {(index + 1) * dx}
                  {units}
                </SvgTypography>,
              ]
            )
          : null}
      </ChartSvg>
    </View>
  );
}
