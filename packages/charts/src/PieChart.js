// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';

import {
  defaultChartPalette,
  defaultChartPaletteKey,
  defaultChartSize,
  defaultChartTextAlignment,
  defaultChartTitle,
  defaultChartVerticalAlignment,
  defaultPieChartUnits,
} from './constants';
import type { ChartProps } from './types';
import ChartSvg from './ChartSvg';
import ChartTitle from './ChartTitle';

type Props = $Rest<ChartProps, {| kind: string |}>;

/**
 * @description Pie chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function PieChart({
  elements,
  palette = defaultChartPalette,
  paletteKey = defaultChartPaletteKey,
  textAlignment = defaultChartTextAlignment,
  size = defaultChartSize,
  title = defaultChartTitle,
  verticalAlignment = defaultChartVerticalAlignment,
  units = defaultPieChartUnits,
  as: View = React.Fragment,
  id,
  parent_id,
  type,
  ...viewProps
}): Props {
  const sum = React.useMemo(
    () => elements.reduce((acc, { value }) => acc + value, 0),
    [elements]
  );

  const [radius, outerRadius, innerRadius, center, quarter] = React.useMemo(
    () => [size / 2, size / 2 + size / 9, size / 6, size / 2, sum / 4],
    [size, sum]
  );

  const [viewBox, setViewBox] = React.useState(`0 0 ${size} ${size}`);

  const bounds = React.useMemo(() => ({}), []);

  React.useLayoutEffect(() => {
    setViewBox(
      `${bounds.minX} ${bounds.minY} ${bounds.maxX -
        bounds.minX} ${bounds.maxY - bounds.minY}`
    );
  }, [bounds, elements]);

  bounds.minX = bounds.minY = 0;
  bounds.maxX = bounds.maxY = size;

  let end = (3 * Math.PI) / 4;
  let endX = Math.cos(end);
  let endY = Math.sin(end);

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <ChartSvg
        overflow={'visible'}
        maxWidth={800}
        preserveAspectRatio={'xMinYMin meet'}
        verticalAlignment={verticalAlignment}
        viewBox={viewBox}
      >
        {elements.map(({ title, value }, index) => {
          const start = end;
          const startX = endX;
          const startY = endY;
          const length = (2 * value * Math.PI) / sum;

          end = start + length;
          endX = Math.cos(end);
          endY = Math.sin(end);

          const textColor = value >= quarter ? 'white' : 'black';
          const textX =
            center +
            (value >= quarter ? innerRadius : outerRadius) *
              Math.cos(start + length / 2);
          const textY =
            center +
            (value >= quarter ? innerRadius : outerRadius) *
              Math.sin(start + length / 2);

          const titleWidth = 2 * (2 + title.length);
          const valueWidth = 2 * (2 + String(value).length);
          const textBoxWidth = Math.max(titleWidth, valueWidth);
          const textBoxHeight = 1.5 * 2 * 1.75;

          if (textX - textBoxWidth / 2 < bounds.minX) {
            bounds.minX = textX - textBoxWidth / 2;
          }
          if (textX > bounds.maxX + textBoxWidth / 2) {
            bounds.maxX = textX + textBoxWidth / 2;
          }
          if (textY - 2 * 2 < bounds.minY) {
            bounds.minY = textY - 2 * 2;
          }
          if (textY + textBoxHeight > bounds.maxY) {
            bounds.maxY = textY + textBoxHeight;
          }
          return [
            <path
              d={[
                `M ${center + radius * endX} ${center + radius * endY}`,
                `A ${radius} ${radius} 0 ${+(length > Math.PI)} 0 ${center +
                  radius * startX} ${center + radius * startY}`,
                `L ${center} ${center}`,
                `L ${center + radius * endX} ${center + radius * endY}`,
              ].join(' ')}
              fill={palette[index % palette.length]}
              key={['slice', index]}
            />,

            <SvgTypography
              fill={textColor}
              index={index}
              key={'value'}
              textAnchor={'middle'}
              variant={'h4'}
              fontWeight={400}
              x={textX}
              y={textY}
            >
              {value}
              {units}
            </SvgTypography>,

            <SvgTypography
              dominantBaseline={'hanging'}
              fill={textColor}
              index={index}
              key={'title'}
              textAnchor={'middle'}
              variant={'h5'}
              fontWeight={400}
              x={textX}
              y={textY}
            >
              {title}
            </SvgTypography>,
          ];
        })}
      </ChartSvg>
    </View>
  );
}
