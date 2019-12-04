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

const XAxis = ({ barWidth, dx, x, y, maxValue, units }) =>
  Array.from({ length: Math.round(maxValue / dx) }).map(
    (_, index, { length }) => [
      <line
        key={['line', index]}
        x1={x + (barWidth * index) / length}
        x2={x + (barWidth * (index + 1)) / length}
        y1={y}
        y2={y}
        stroke={'black'}
      />,
      index > 0 && (
        <SvgTypography
          key={['title', index]}
          dominantBaseline={'hanging'}
          x={x + (barWidth * index) / length}
          y={y}
        >
          {parseInt((index * maxValue) / length)}
          {units}
        </SvgTypography>
      ),
    ]
  );

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
  const [{ xScale, yScale }, svgRef] = useSvgScale();

  const canvasRef = React.useRef(null);
  const { current: canvas } = canvasRef;

  const titleMetrics = useTextMetrics(
    `${elements.reduce(
      (found, { title }) =>
        `${title}`.length > found.length ? `${title}` : found,
      ''
    )}**`,
    canvas
  );
  const titleWidth = titleMetrics.width * xScale;

  const valueMetrics = useTextMetrics(
    `**${elements.reduce(
      (found, { value }) =>
        `${value}`.length > found.length ? `${value}` : found,
      ''
    )}`,
    canvas
  );
  const valueWidth = valueMetrics.width * xScale;
  const valueHeight = valueMetrics.height * yScale;

  const barHeight = Math.min(
    (VIEWPORT_HEIGHT - valueHeight) / elements.length,
    VIEWPORT_HEIGHT / 16
  );
  const barWidth = VIEWPORT_WIDTH - (titleWidth + valueWidth);

  const maxValue = Math.max(...elements.map(({ value }) => +value));
  const maxValueMetrics = useTextMetrics(`*${parseInt(maxValue)}*`, canvas);
  const maxValueWidth = maxValueMetrics.width * xScale;

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <ChartSvg
        strokeWidth={2 * yScale}
        verticalAlignment={verticalAlignment}
        viewBox={`0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`}
      >
        {elements.map(({ title, value }, index) => {
          const width = (barWidth * value) / maxValue;
          const color = palette[index % palette.length];
          const y = barHeight * index;

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
            >
              {value}
              {units}
            </SvgTypography>,
          ];
        })}
        {xAxis && maxValueWidth ? (
          <XAxis
            barHeight={barHeight}
            barWidth={barWidth}
            dx={Math.max(dx, maxValueWidth)}
            maxValue={maxValue}
            valueHeight={valueHeight}
            x={titleWidth}
            y={barHeight * elements.length}
          />
        ) : null}
        <ForeignObject ref={svgRef} height={'100%'} width={'100%'}>
          <Canvas ref={canvasRef} />
        </ForeignObject>
      </ChartSvg>
    </View>
  );
}
