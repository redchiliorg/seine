// @flow
import * as React from 'react';

import {
  defaultChartFontSize,
  defaultChartFontWeight,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartSize,
} from './constants';
import type { ChartProps } from './types';
import BarChartTitle from './BarChartTitle';
import BarChartValue from './BarChartValue';

type Props = $Rest<ChartProps, {| kind: string |}>;

/**
 * @description Bar chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function BarChart({
  elements,
  fontWeight = defaultChartFontWeight,
  fontSize = defaultChartFontSize,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  size = defaultChartSize,

  as: View = 'svg',
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
    <View
      viewBox={`0 0 ${size} ${height}`}
      width={'100%'}
      fontSize={fontSize}
      fontWeight={fontWeight}
      preserveAspectRatio={'xMidYMax meet'}
      {...viewProps}
    >
      {elements.map(({ title, value }, index) => {
        const len = (barMaxLen * value) / maxValue;
        const color = palette[index % palette.length];
        const y = (index * barHeight) / 2;

        return [
          <BarChartTitle
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
          </BarChartTitle>,

          <BarChartValue
            fill={color}
            height={barHeight}
            index={index}
            key={'value'}
            lineHeight={fontHeight}
            x={titleMaxLen + len + 1.5 * fontSize}
            y={y}
            width={valueMaxLen}
          >
            {value}
          </BarChartValue>,

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
    </View>
  );
}
