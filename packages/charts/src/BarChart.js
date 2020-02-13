// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import type { ChartElement } from '@seine/core';

import {
  defaultChartDx,
  defaultChartPalette,
  defaultChartUnits,
  defaultChartXAxis,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './constants';
import ChartAxis from './ChartAxis';

type Props = {
  elements: ChartElement[],

  dx?: number,
  palette?: string[],
  units?: string,
  xAxis?: boolean,
};

/**
 * @description Bar chart content block renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function BarChart({
  elements,

  dx = defaultChartDx,
  palette = defaultChartPalette,
  units = defaultChartUnits,
  xAxis = defaultChartXAxis,
}: Props) {
  const [
    titleMethods,
    titleTypographyMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const titleWidth = titleMethods.getScaledWidth();
  const titleHeight = titleMethods.getScaledHeight();

  const [
    valueMethods,
    valueTypographyMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const valueWidth = valueMethods.getScaledWidth();

  const barHeight = VIEWPORT_HEIGHT / Math.max(elements.length, 4);
  const barWidth = VIEWPORT_WIDTH - (titleWidth + valueWidth);

  const maxValue = elements.reduce(
    (max, { value }) => Math.max(+value, max),
    -Infinity
  );

  return (
    <g strokeWidth={titleHeight / 40}>
      {elements.map(({ title, value }, index) => {
        const width = (barWidth * value) / maxValue;
        const color = palette[index % palette.length];
        const y = VIEWPORT_HEIGHT - barHeight * (elements.length - index);

        return [
          <SvgTypography
            dominantBaseline={'middle'}
            fill={color}
            ref={titleTypographyMethodsRef}
            key={`title.${index}`}
            x={0}
            y={y + barHeight / 2}
          >
            {title}
            {'  '}
          </SvgTypography>,

          <rect
            fill={color}
            height={barHeight}
            width={width}
            key={`selection.${index}`}
            x={titleWidth}
            y={y}
          />,

          <SvgTypography
            dominantBaseline={'middle'}
            ref={valueTypographyMethodsRef}
            fill={color}
            key={`value.${index}`}
            x={titleWidth + width}
            y={y + barHeight / 2}
          >
            {'  '}
            {value}
            {units}
          </SvgTypography>,
        ];
      })}
      {!!xAxis && (
        <ChartAxis
          length={VIEWPORT_WIDTH - titleWidth}
          max={maxValue}
          step={dx}
          units={units}
          x={titleWidth}
          y={VIEWPORT_HEIGHT}
        />
      )}
    </g>
  );
}
