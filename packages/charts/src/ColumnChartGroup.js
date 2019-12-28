// @flow
import * as React from 'react';
import {
  Canvas,
  ForeignObject,
  SvgTypography,
  useSvgScale,
  useTextMetrics,
} from '@seine/styles';
import type { BlockElement } from '@seine/core';

import ChartSvg, { Props as ChartSvgProps } from './ChartSvg';

export type Props = {
  elements: BlockElement[],
  group: string,
  height: number,
  minValue: number,
  maxValue: number,
  palette: string[],
  units: string,
  width: number,
} & $Shape<ChartSvgProps>;

/**
 * @description Group of column chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ColumnChartGroup({
  elements,
  group,
  height,
  minValue,
  maxValue,
  palette,
  units,
  width,
  ...chartSvgProps
}: Props) {
  const [, yScale, svgRef] = useSvgScale();
  const [canvas, setCanvas] = React.useState(null);
  let [, textHeight] = useTextMetrics(
    `${elements.reduce(
      (found, { value }) =>
        `${value}`.length > found.length ? `${value}` : found,
      ''
    )} `,
    canvas
  );
  textHeight *= yScale;
  const columnWidth = width / (elements.length + 1);
  const columnHeight = height - 2 * textHeight;

  return (
    <ChartSvg
      {...chartSvgProps}
      preserveAspectRatio={'none'}
      height={'100%'}
      width={width}
      strokeWidth={yScale / 2}
    >
      {elements.map(({ value }, index) => {
        const rectHeight =
          columnHeight *
          ((Math.max(minValue, Math.min(maxValue, value)) - minValue) /
            (maxValue - minValue));
        const fill = palette[index % palette.length];

        return (
          <React.Fragment key={index}>
            <rect
              fill={fill}
              height={rectHeight}
              width={columnWidth}
              x={(index + 0.5) * columnWidth}
              y={columnHeight - rectHeight + textHeight}
            />
            <SvgTypography
              fill={fill}
              textAnchor={'middle'}
              x={(index + 1) * columnWidth}
              y={columnHeight - rectHeight + textHeight}
            >
              {value}
              {units}
            </SvgTypography>
          </React.Fragment>
        );
      })}
      <path
        d={`m${0} ${columnHeight + textHeight}h${width}`}
        stroke={'black'}
      />
      <SvgTypography
        textAnchor={'middle'}
        dominantBaseline={'hanging'}
        x={width / 2}
        y={columnHeight + textHeight}
      >
        {group}
      </SvgTypography>
      <ForeignObject ref={svgRef} width={'100%'} height={'100%'}>
        <Canvas ref={setCanvas} />
      </ForeignObject>
    </ChartSvg>
  );
}
