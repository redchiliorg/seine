// @flow
import * as React from 'react';

import {
  defaultChartDy,
  defaultChartFontSize,
  defaultChartLineHeight,
  defaultChartMinValue,
  defaultChartPalette,
  defaultChartPaletteKey,
  defaultChartTitle,
  defaultChartUnits,
  defaultChartYAxis,
} from './constants';
import type { ChartProps } from './types';
import { useGroupedElements } from './helpers';
import ChartLegendItem from './ChartLegendItem';
import ColumnChartGroup from './ColumnChartGroup';
import { ColumnChartYAxis } from './ColumnChartYAxis';
import ChartTitle from './ChartTitle';
import ChartSvg from './ChartSvg';

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
  minValue: initialMinValue = defaultChartMinValue,

  dy = defaultChartDy,
  fontSize = defaultChartFontSize,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  paletteKey = defaultChartPaletteKey,
  title = defaultChartTitle,
  units = defaultChartUnits,
  yAxis = defaultChartYAxis,

  as: View = React.Fragment,
  id,
  parent_id,
  size,
  type,
  ...viewProps
}: Props) {
  const barGroupWidth = 66;
  const xPadding = 23;
  const [maxValue, minValue, titles, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  return (
    <View {...viewProps}>
      <ChartTitle>{title}</ChartTitle>
      <ChartSvg
        viewBox={React.useMemo(
          () =>
            [
              0,
              -3.5 * lineHeight * fontSize,
              groups.length > 2
                ? 79 * groups.length
                : groups.length === 2
                ? 99 * groups.length
                : 128,
              (titles.length ? 210 : 140) + 1.5 * 3.5 * lineHeight * fontSize,
            ].join(' '),
          [fontSize, groups.length, lineHeight, titles.length]
        )}
      >
        {React.useMemo(
          () =>
            groups.map(([group, elements], index) => (
              <ColumnChartGroup
                key={index}
                barGroupWidth={barGroupWidth}
                elements={elements}
                fontSize={1.5 * fontSize}
                group={group}
                height={80}
                lineHeight={lineHeight}
                minValue={minValue}
                maxValue={maxValue}
                palette={palette}
                size={10}
                units={units}
                width={10}
                x={xPadding * 2 + index * barGroupWidth}
                y={110}
              />
            )),
          [fontSize, groups, lineHeight, maxValue, minValue, palette, units]
        )}
        <path
          d={`m${xPadding + 20} ${110}h${barGroupWidth * groups.length -
            (groups.length > 1 ? 10 * (6 - titles.length) : 0)}`}
          stroke={'#000'}
          strokeWidth={0.1}
        />

        {yAxis ? (
          <ColumnChartYAxis
            dy={dy}
            fontSize={1.5 * fontSize}
            height={90}
            maxValue={maxValue}
            minValue={minValue}
            title={title}
            units={units}
            x={xPadding}
            y={20}
          />
        ) : null}

        {titles.map(({ id, title }, index) => (
          <ChartLegendItem
            key={id}
            fill={palette[index % palette.length]}
            fontSize={1.5 * fontSize}
            lineHeight={lineHeight}
            size={10}
            title={title}
            width={80}
            x={xPadding + 10 + 13 + barGroupWidth * (index % groups.length)}
            y={
              141 +
              (10 + fontSize * lineHeight) * parseInt(index / groups.length)
            }
          />
        ))}
      </ChartSvg>
    </View>
  );
}
