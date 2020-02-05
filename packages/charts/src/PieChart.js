// @flow
import * as React from 'react';
import {
  FlexBox,
  SvgTypography,
  useTypographyChildrenMethods,
} from '@seine/styles';
import { useAutoMemo } from 'hooks.macro';

import {
  defaultChartPalette,
  defaultChartPaletteKey,
  defaultChartTextAlignment,
  defaultChartTitle,
  defaultChartVerticalAlignment,
  defaultPieChartLegend,
  defaultPieChartUnits,
  VIEWPORT_HEIGHT,
} from './constants';
import type { ChartProps } from './types';
import ChartSvg from './ChartSvg';
import ChartTitle from './ChartTitle';
import LegendItem from './LegendItem';
import LegendBox from './LegendBox';

type Props = $Rest<ChartProps, {| kind: string |}>;

const RADIUS = VIEWPORT_HEIGHT / 2;
const OUTER_RADIUS = VIEWPORT_HEIGHT / 2 + VIEWPORT_HEIGHT / 9;
const INNER_RADIUS = VIEWPORT_HEIGHT / 6;
const CENTER = VIEWPORT_HEIGHT / 2;

/**
 * @description Pie chart content block renderer.
 * @param {ChartProps}: props
 * @returns {React.Node}
 */
export default function PieChart({
  elements,
  legend = defaultPieChartLegend,
  palette = defaultChartPalette,
  paletteKey = defaultChartPaletteKey,
  textAlignment = defaultChartTextAlignment,
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
  const quarter = useAutoMemo(sum / 4);
  const [
    titleMethods,
    titleTypographyMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);

  let end = (3 * Math.PI) / 4;
  let endX = Math.cos(end);
  let endY = Math.sin(end);

  const textHeight = titleMethods.getScaledHeight();

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <FlexBox height={`calc(100% - ${2 * textHeight}px)`} width={'auto'}>
        <ChartSvg
          verticalAlignment={verticalAlignment}
          viewBox={`0 0 ${VIEWPORT_HEIGHT} ${VIEWPORT_HEIGHT}`}
        >
          {elements.map(({ title, value }, index) => {
            const start = end;
            const startX = endX;
            const startY = endY;
            const length = (2 * value * Math.PI) / sum;

            end = start + length;
            endX = Math.cos(end);
            endY = Math.sin(end);

            const textColor = value >= quarter || legend ? 'white' : 'black';
            const textX =
              CENTER +
              (legend
                ? RADIUS / 2
                : value >= quarter
                ? INNER_RADIUS
                : OUTER_RADIUS) *
                Math.cos(start + length / 2);
            const textY =
              CENTER +
              (legend
                ? RADIUS / 2
                : value >= quarter
                ? INNER_RADIUS
                : OUTER_RADIUS) *
                Math.sin(start + length / 2);

            return [
              <path
                d={[
                  `M ${CENTER + RADIUS * endX} ${CENTER + RADIUS * endY}`,
                  `A ${RADIUS} ${RADIUS} 0 ${+(length > Math.PI)} 0 ${CENTER +
                    RADIUS * startX} ${CENTER + RADIUS * startY}`,
                  `L ${CENTER} ${CENTER}`,
                  `L ${CENTER + RADIUS * endX} ${CENTER + RADIUS * endY}`,
                ].join(' ')}
                fill={palette[index % palette.length]}
                key={`slice.${index}`}
              />,

              <SvgTypography
                fill={textColor}
                key={`value.${index}`}
                dominantBaseline={legend ? 'middle' : 'baseline'}
                textAnchor={'middle'}
                variant={'h4'}
                fontWeight={400}
                x={textX}
                y={textY}
              >
                {value}
                {units}
              </SvgTypography>,

              !legend && (
                <SvgTypography
                  dominantBaseline={'hanging'}
                  fill={textColor}
                  key={`title.${index}`}
                  textAnchor={'middle'}
                  variant={'h5'}
                  fontWeight={400}
                  x={textX}
                  y={textY}
                  ref={titleTypographyMethodsRef}
                >
                  {title}
                </SvgTypography>
              ),
            ];
          })}
        </ChartSvg>
      </FlexBox>
      <FlexBox width={'auto'} height={2 * textHeight}>
        {legend &&
          elements.map(({ title }, index) => (
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
