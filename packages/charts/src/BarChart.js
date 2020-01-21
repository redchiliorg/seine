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
  VIEWPORT_HEIGHT,
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
    titleMethods,
    titleTypographyMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const titleWidth = titleMethods.getScaledWidth();

  const [
    valueMethods,
    valueTypographyMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const valueWidth = valueMethods.getWidth();
  const valueHeight = valueMethods.getHeight();

  const barHeight = VIEWPORT_HEIGHT / Math.max(elements.length, 10);
  const barWidth = VIEWPORT_WIDTH - (titleWidth + valueWidth);

  const maxValue = elements.reduce(
    (max, { value }) => Math.max(+value, max),
    -Infinity
  );

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <ChartSvg
        strokeWidth={valueHeight / 32}
        verticalAlignment={verticalAlignment}
        viewBox={`0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`}
      >
        {elements.map(({ title, value }, index) => {
          const width = (barWidth * value) / maxValue;
          const color = palette[index % palette.length];
          const y =
            VIEWPORT_HEIGHT -
            barHeight * (elements.length - index) -
            valueHeight;

          return [
            <SvgTypography
              dominantBaseline={'middle'}
              fill={color}
              ref={titleTypographyMethodsRef}
              index={index}
              key={'title'}
              x={0}
              y={y + barHeight / 2}
            >
              {title}
              {'  '}
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
              ref={valueTypographyMethodsRef}
              textAnchor={'end'}
              fill={color}
              index={index}
              key={'value'}
              x={titleWidth + width + valueWidth}
              y={y + barHeight / 2}
            >
              {'  '}
              {value}
              {units}
            </SvgTypography>,
          ];
        })}
        {xAxis ? (
          <ChartAxis
            length={barWidth}
            max={maxValue}
            step={dx}
            units={units}
            x={titleWidth}
            y={VIEWPORT_HEIGHT - valueHeight}
          />
        ) : null}
      </ChartSvg>
    </View>
  );
}
