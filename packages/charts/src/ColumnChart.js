// @flow
import * as React from 'react';
import {
  Canvas,
  ForeignObject,
  useSvgScale,
  useTextMetrics,
} from '@seine/styles';

import {
  defaultChartDy,
  defaultChartMinValue,
  defaultChartPalette,
  defaultChartPaletteKey,
  defaultChartTextAlignment,
  defaultChartTitle,
  defaultChartUnits,
  defaultChartVerticalAlignment,
  defaultChartYAxis,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './constants';
import type { ChartProps } from './types';
import { useGroupedElements } from './helpers';
import ChartLegendItem from './ChartLegendItem';
import ColumnChartGroup from './ColumnChartGroup';
import ChartTitle from './ChartTitle';
import ChartSvg from './ChartSvg';
import ChartAxis from './ChartAxis';

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
  palette = defaultChartPalette,
  paletteKey = defaultChartPaletteKey,
  textAlignment = defaultChartTextAlignment,
  title = defaultChartTitle,
  units = defaultChartUnits,
  verticalAlignment = defaultChartVerticalAlignment,
  yAxis = defaultChartYAxis,

  as: View = React.Fragment,
  id,
  parent_id,
  size,
  type,
  ...viewProps
}: Props) {
  const xPadding = 23;
  const [maxValue, minValue, titles, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  const canvasRef = React.useRef(null);
  const { current: canvas } = canvasRef;

  const [{ xScale, yScale }, svgRef] = useSvgScale();

  const valueMetrics = useTextMetrics(
    `${elements.reduce(
      (found, { value }) =>
        `${value}`.length > found.length ? `${value}` : found,
      ''
    )} `,
    canvas
  );
  const valueHeight = valueMetrics.height * yScale;
  const valueWidth = valueMetrics.width * xScale;

  const titleMetrics = useTextMetrics(
    `${elements.reduce(
      (found, { title }) =>
        `${title}`.length > found.length ? `${title}` : found,
      ''
    )}**`,
    canvas
  );
  const titleWidth = titleMetrics.width * xScale;

  const graphHeight = VIEWPORT_HEIGHT - valueHeight;
  const legendHeight = 10 * groups.length;

  const barGroupWidth =
    (VIEWPORT_WIDTH - xPadding * groups.length) / groups.length;

  const x = valueWidth;

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <ChartSvg
        strokeWidth={2 * yScale}
        verticalAlignment={verticalAlignment}
        viewBox={`0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT +
          2 * valueHeight +
          legendHeight}`}
      >
        {yAxis ? (
          <ChartAxis
            direction={'up'}
            finite
            length={graphHeight - 6 * valueHeight}
            max={maxValue}
            min={minValue}
            noLine
            step={dy}
            units={units}
            x={x}
            y={graphHeight}
          />
        ) : null}
        {groups.map(([group, elements], index) => (
          <ColumnChartGroup
            key={index}
            barGroupWidth={barGroupWidth}
            elements={elements}
            group={group}
            height={graphHeight - 6 * valueHeight}
            minValue={minValue}
            maxValue={maxValue}
            palette={palette}
            size={10}
            units={units}
            width={10}
            x={x + index * (barGroupWidth + xPadding / 2) + barGroupWidth / 2}
            y={graphHeight}
          />
        ))}

        {titles.map(({ id, title }, index) => (
          <ChartLegendItem
            key={id}
            fill={palette[index % palette.length]}
            size={10}
            title={title}
            width={11 + titleWidth}
            x={x + (14 + titleWidth) * (index % groups.length)}
            y={
              graphHeight +
              2 * valueHeight +
              11 * parseInt(index / groups.length)
            }
          />
        ))}
        <ForeignObject ref={svgRef} height={'100%'} width={'100%'}>
          <Canvas ref={canvasRef} />
        </ForeignObject>
      </ChartSvg>
    </View>
  );
}
