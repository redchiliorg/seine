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
  const [xScale, yScale, svgRef] = useSvgScale();

  const canvasRef = React.useRef(null);
  const { current: canvas } = canvasRef;

  let [titleWidth] = useTextMetrics(
    `${elements.reduce(
      (found, { title }) =>
        `${title}`.length > found.length ? `${title}` : found,
      ''
    )}**`,
    canvas
  );
  titleWidth *= xScale;

  let [valueWidth, valueHeight] = useTextMetrics(
    `**${elements.reduce(
      (found, { value }) =>
        `${value}`.length > found.length ? `${value} ` : found,
      ''
    )}`,
    canvas
  );
  valueWidth *= xScale;
  valueHeight *= yScale;

  const barHeight = Math.min(
    (VIEWPORT_HEIGHT - valueHeight) / elements.length,
    VIEWPORT_HEIGHT / 16
  );
  const barWidth = VIEWPORT_WIDTH - (titleWidth + valueWidth);

  const maxValue = Math.max(...elements.map(({ value }) => +value));
  let [maxValueWidth] = useTextMetrics(`*${parseInt(maxValue)}*`, canvas);
  maxValueWidth *= xScale;

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
          const y =
            VIEWPORT_HEIGHT -
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
        {xAxis ? (
          <ChartAxis
            length={barWidth}
            max={maxValue}
            step={maxValueWidth ? Math.max(dx, maxValueWidth) : dx}
            units={units}
            x={titleWidth}
            y={VIEWPORT_HEIGHT - valueHeight}
          />
        ) : null}
        <ForeignObject ref={svgRef} height={'100%'} width={'100%'}>
          <Canvas ref={canvasRef} />
        </ForeignObject>
      </ChartSvg>
    </View>
  );
}
