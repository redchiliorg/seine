// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';

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
import ChartTitle from './ChartTitle';
import ChartSvg from './ChartSvg';

type Props = $Rest<ChartProps, {| kind: string |}> & {
  as?: React.ElementType,
};

const FlexBox = styled.div`
  display: flex;
  position: relative;
  ${({ height }) =>
    typeof height === 'number'
      ? css`
          height: ${height}px;
        `
      : height &&
        css`
          height: ${height};
        `}
  ${({ width }) =>
    typeof width === 'number'
      ? css`
          width: ${width}px;
        `
      : width &&
        css`
          width: ${width};
        `}
`;

const CondensedText = styled.span`
  && {
    display: inline-block;
    font-size: ${({ factor }) => factor}em;
    text-align: center;
    width: 100%;
  }
`;

const LegendItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
`;

const LegendBox = styled.div`
  && {
    background-color: ${({ color }) => color};
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    margin-right: 10px;
  }
`;
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
  const [maxValue, minValue, titles, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  const [
    { getScaledWidth, getScaledHeight, getHeight },
    childMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const scaledTextHeight = getScaledHeight();
  const scaledTextWidth = getScaledWidth();
  const textHeight = getHeight();

  const WIDTH = VIEWPORT_WIDTH / groups.length;
  const HEIGHT = VIEWPORT_HEIGHT;

  const columnWidth = WIDTH / (1 + elements.length / groups.length);
  const columnHeight = HEIGHT - 2 * scaledTextHeight;

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>

      <FlexBox height={`calc(100% - ${textHeight}px)`} width={'100%'}>
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
                  >
                    {scaledTextWidth > columnWidth ? (
                      <CondensedText factor={columnWidth / scaledTextWidth}>
                        {value}
                      </CondensedText>
                    ) : (
                      value
                    )}
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
      <FlexBox width={'auto'} height={textHeight}>
        {titles.map(({ title }, index) => (
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
