// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';

import {
  defaultChartDx,
  defaultChartPalette,
  defaultChartPaletteKey,
  defaultChartTextAlignment,
  defaultChartTitle,
  defaultChartUnits,
  defaultChartVerticalAlignment,
  defaultChartXAxis,
  VIEWPORT_WIDTH,
} from './constants';
import type { ChartProps } from './types';
import ChartTitle from './ChartTitle';
import ChartSvg from './ChartSvg';
import ChartAxis from './ChartAxis';

type Props = $Rest<ChartProps, {| kind: string |}>;

/**
 * @description Bar chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function BarChart({
  elements,

  dx = defaultChartDx,
  palette = defaultChartPalette,
  paletteKey = defaultChartPaletteKey,
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
  const [
    { getScaledWidth: getTitleWidth },
    titleTypographyMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const titleWidth = getTitleWidth();

  const [
    { getScaledWidth: getValueWidth, getScaledHeight: getValueHeight },
    valueTypographyMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const valueWidth = getValueWidth();
  const valueHeight = getValueHeight();
  const barHeight = Math.min(
    (VIEWPORT_WIDTH - valueHeight) / elements.length,
    VIEWPORT_WIDTH / 16
  );

  const barWidth = VIEWPORT_WIDTH - (titleWidth + valueWidth);
  const maxValue = Math.max(...elements.map(({ value }) => +value));

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <ChartSvg
        strokeWidth={valueHeight / 14}
        verticalAlignment={verticalAlignment}
        viewBox={'square'}
      >
        {elements.map(({ title, value }, index) => {
          const width = (barWidth * value) / maxValue;
          const color = palette[index % palette.length];
          const y =
            VIEWPORT_WIDTH -
            barHeight * (elements.length - index) -
            valueHeight;

          return [
            <SvgTypography
              dominantBaseline={'middle'}
              fill={color}
              index={index}
              key={'title'}
              x={0}
              y={y + barHeight / 2}
              ref={titleTypographyMethodsRef}
            >
              {title}{' '}
            </SvgTypography>,

            <rect
              fill={color}
              height={barHeight}
              key={['bar', index]}
              width={width}
              x={titleWidth}
              y={y}
            />,

            <SvgTypography
              dominantBaseline={'middle'}
              textAnchor={'end'}
              fill={color}
              index={index}
              key={'value'}
              variant={'h6'}
              x={titleWidth + width + valueWidth}
              y={y + barHeight / 2}
              ref={valueTypographyMethodsRef}
            >
              {' '}
              {value}
              {units}
            </SvgTypography>,
          ];
        })}
        {!!xAxis && (
          <ChartAxis
            length={barWidth}
            max={maxValue}
            step={dx}
            units={units}
            x={titleWidth}
            y={VIEWPORT_WIDTH}
          />
        )}
      </ChartSvg>
    </View>
  );
}
