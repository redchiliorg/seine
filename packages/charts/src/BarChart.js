// @flow
import * as React from 'react';
import {
  Canvas,
  ForeignObject,
  SvgTypography,
  useSvgScale,
  useTextMetrics,
} from '@seine/styles';

import {
  defaultChartDx,
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
  const [{ xScale, yScale }, svgRef] = useSvgScale();

  const canvasRef = React.useRef(null);
  const { current: canvas } = canvasRef;

  const titleMetrics = useTextMetrics(
    `${elements.reduce(
      (found, { title }) =>
        `${title}`.length > found.length ? `${title}` : found,
      ''
    )}`,
    canvas
  );
  const titleWidth = titleMetrics.width * xScale;

  const valueMetrics = useTextMetrics(
    `${elements.reduce(
      (found, { value }) =>
        `${value}`.length > found.length ? `${value}` : found,
      ''
    )}`,
    canvas
  );
  const valueWidth = valueMetrics.width * xScale;

  const barHeight = size / 16;
  const barWidth = size - (titleWidth + valueWidth);

  const height = elements.length * barHeight + valueMetrics.height * yScale;
  const maxValue = Math.max(...elements.map(({ value }) => value));

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <ChartSvg
        strokeWidth={2 * yScale}
        verticalAlignment={verticalAlignment}
        viewBox={`0 0 ${size} ${height}`}
      >
        {elements.map(({ title, value }, index) => {
          const len = (barWidth * value) / maxValue;
          const color = palette[index % palette.length];
          const y = index * barHeight;

          return [
            <SvgTypography
              dominantBaseline={'middle'}
              fill={color}
              index={index}
              key={'title'}
              x={0}
              y={y + barHeight / 2}
            >
              {title}
            </SvgTypography>,

            <SvgTypography
              dominantBaseline={'middle'}
              fill={color}
              index={index}
              key={'value'}
              x={titleWidth + len}
              y={y + barHeight / 2}
            >
              {value}
              {units}
            </SvgTypography>,

            <rect
              fill={color}
              height={barHeight}
              key={['bar', index]}
              width={len}
              x={titleWidth}
              y={y}
            />,
          ];
        })}
        {xAxis
          ? Array.from({ length: Math.round(maxValue / dx) }).map(
              (_, index, { length }) => [
                <line
                  key={['line', index]}
                  x1={titleWidth + (barWidth * index) / length}
                  x2={titleWidth + (barWidth * (index + 1)) / length}
                  y1={elements.length * barHeight}
                  y2={elements.length * barHeight}
                  stroke={'black'}
                />,
                <SvgTypography
                  key={['title', index]}
                  dominantBaseline={'hanging'}
                  textAnchor={'middle'}
                  x={titleWidth + (barWidth * (index + 1)) / length}
                  y={height - valueMetrics.height * yScale + 10 * yScale}
                >
                  {Math.min((index + 1) * dx, maxValue)}
                  {units}
                </SvgTypography>,
              ]
            )
          : null}
        <ForeignObject ref={svgRef} height={'100%'} width={'100%'}>
          <Canvas ref={canvasRef} variant={'h5'} />
        </ForeignObject>
      </ChartSvg>
    </View>
  );
}
