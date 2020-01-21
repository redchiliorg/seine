// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';
import { useAutoMemo } from 'hooks.macro';

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
  const sum = useAutoMemo(elements.reduce((acc, { value }) => acc + value, 0));

  const [radius, outerRadius, innerRadius, center, quarter] = useAutoMemo([
    size / 2,
    size / 2 + size / 9,
    size / 6,
    size / 2,
    sum / 4,
  ]);

  const [viewBox, setViewBox] = React.useState(`0 0 ${size} ${size}`);

  const bounds = useAutoMemo({});

  React.useLayoutEffect(() => {
    setViewBox(
      `${bounds.minX} ${bounds.minY} ${bounds.maxX -
        bounds.minX} ${bounds.maxY - bounds.minY}`
    );
  }, [bounds]);

  bounds.minX = bounds.minY = 0;
  bounds.maxX = bounds.maxY = size;

  let end = (3 * Math.PI) / 4;
  let endX = Math.cos(end);
  let endY = Math.sin(end);

  const createChildrenMethodsHandler = (textX, textY) => (methods) => {
    if (methods !== null) {
      const textBoxWidth = methods.getScaledWidth();
      const textBoxHeight = methods.getScaledHeight();
      const minX = textX - textBoxWidth / 2;
      const maxX = textX + textBoxWidth / 2;
      const minY = textY;
      const maxY = textY + textBoxHeight;

      if (minX < bounds.minX) {
        bounds.minX = minX;
      }
      if (maxX > bounds.maxX) {
        bounds.maxX = maxX;
      }
      if (minY < bounds.minY) {
        bounds.minY = minY;
      }
      if (maxY > bounds.maxY) {
        bounds.maxY = maxY;
      }
    }
  };

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

          const onChildrenMethods = createChildrenMethodsHandler(textX, textY);

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
              ref={onChildrenMethods}
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
              ref={onChildrenMethods}
            >
              {title}
            </SvgTypography>,
          ];
        })}
      </ChartSvg>
    </View>
  );
}
