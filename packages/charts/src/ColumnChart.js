// @flow
import * as React from 'react';
import {
  FlexBox,
  SvgTypography,
  useTypographyChildrenMethods,
} from '@seine/styles';

import {
  defaultChartDy,
  defaultChartLegend,
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
import ChartTitle from './ChartTitle';
import ChartSvg from './ChartSvg';
import LegendItem from './LegendItem';
import LegendBox from './LegendBox';

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
  legend = defaultChartLegend,
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
  const [maxValue, minValue, titles, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  const [methods, childMethodsRef] = useTypographyChildrenMethods(
    elements.length
  );
  const scaledTextHeight = methods.getScaledHeight();
  const textHeight = methods.getHeight();

  const WIDTH = VIEWPORT_WIDTH / groups.length;
  const HEIGHT = VIEWPORT_HEIGHT;

  const columnWidth = WIDTH / (1 + elements.length / groups.length);
  const columnHeight = HEIGHT - 2 * scaledTextHeight;

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>

      <FlexBox height={`calc(100% - ${2 * textHeight}px)`} width={'auto'}>
        {groups.map(([group, elements], groupIndex) => (
          <ChartSvg
            key={groupIndex}
            verticalAlignment={'start'}
            strokeWidth={scaledTextHeight / 40}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
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
                    y={columnHeight - rectHeight + scaledTextHeight}
                  />
                  <SvgTypography
                    fill={fill}
                    textAnchor={'middle'}
                    x={(index + 1) * columnWidth}
                    y={columnHeight - rectHeight + scaledTextHeight}
                    ref={childMethodsRef}
                    width={columnWidth}
                  >
                    {value}
                    {units}
                  </SvgTypography>
                </React.Fragment>
              );
            })}
            <path
              d={`m${0} ${columnHeight + scaledTextHeight}h${WIDTH}`}
              stroke={'black'}
            />
            <SvgTypography
              textAnchor={'middle'}
              dominantBaseline={'hanging'}
              x={WIDTH / 2}
              y={columnHeight + scaledTextHeight}
              width={columnWidth * elements.length}
            >
              {group}
            </SvgTypography>
          </ChartSvg>
        ))}
      </FlexBox>

      <FlexBox width={'auto'} height={2 * textHeight}>
        {legend &&
          titles.map(({ title }, index) => (
            <LegendItem key={index}>
              <LegendBox
                color={palette[index % palette.length]}
                key={index}
                size={textHeight}
              />
              {title}
            </LegendItem>
          ))}
      </FlexBox>
    </View>
  );
}
