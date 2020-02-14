// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import type { ChartElement } from '@seine/core';

import {
  defaultBarChartLegend,
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

  elementTitleAs: React.ComponentType,
  elementValueAs: React.ComponentType,
  elementRectAs: React.ComponentType,
};

/**
 * @description Bar chart content block renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function BarChartContent({
  elements = [],

  dx = defaultChartDx,
  legend = defaultBarChartLegend,
  palette = defaultChartPalette,
  units = defaultChartUnits,
  xAxis = defaultChartXAxis,

  dy,
  minValue,
  maxValue = elements.reduce(
    (max, { value }) => Math.max(+value, max),
    -Infinity
  ),
  paletteKey,
  yAxis,

  elementTitleAs: ElementTitle = SvgTypography,
  elementValueAs: ElementValue = SvgTypography,
  elementRectAs: ElementRect = 'rect',

  ...metaProps
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
  const valueWidth = legend ? 0 : valueMethods.getScaledWidth();

  const barHeight = VIEWPORT_HEIGHT / Math.max(elements.length, 4);
  const barWidth = VIEWPORT_WIDTH - (titleWidth + valueWidth);

  return (
    <g strokeWidth={titleHeight / 40}>
      {elements.map(({ title, value }, index) => {
        const width = (barWidth * value) / maxValue;
        const color = palette[index % palette.length];
        const y = VIEWPORT_HEIGHT - barHeight * (elements.length - index);
        const meta = { ...elements[index], index };

        return [
          <ElementTitle
            {...metaProps}
            dominantBaseline={'middle'}
            fill={color}
            ref={titleTypographyMethodsRef}
            key={`title.${index}`}
            meta={meta}
            x={0}
            y={y + barHeight / 2}
          >
            {legend ? '' : title}
          </ElementTitle>,

          <ElementRect
            {...metaProps}
            fill={color}
            height={barHeight}
            width={width}
            key={`selection.${index}`}
            meta={meta}
            x={titleWidth}
            y={y}
          />,

          <ElementValue
            {...metaProps}
            dominantBaseline={'middle'}
            ref={valueTypographyMethodsRef}
            fill={color}
            key={`value.${index}`}
            meta={meta}
            x={titleWidth + width}
            y={y + barHeight / 2}
          >
            {'  '}
            {value}
            {units}
          </ElementValue>,
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
