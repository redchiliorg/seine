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
import ChartAxis from './ChartAxis';
import ChartSvg from './ChartSvg';

type Props = $Rest<ChartProps, {| kind: string |}> & {
  as?: React.ElementType,
};

const GroupsBox = styled.div`
  display: flex;
  position: relative;
  ${({ height }) =>
    typeof height === 'number'
      ? css`
          height: ${height}px;
        `
      : css`
          height: ${height};
        `}
  ${({ width }) =>
    typeof width === 'number'
      ? css`
          width: ${width}px;
        `
      : css`
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
  const [maxValue, minValue, , groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  const [
    { getScaledWidth, getScaledHeight },
    childMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const textHeight = getScaledHeight();
  const textWidth = getScaledWidth();

  const columnWidth = VIEWPORT_HEIGHT / (1 + elements.length / groups.length);
  const columnHeight = VIEWPORT_WIDTH - 2 * textHeight;

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>

      <GroupsBox height={'100%'} width={'100%'}>
        <ChartAxis
          direction={'up'}
          finite
          length={columnHeight}
          max={maxValue}
          min={minValue}
          noLine
          step={dy}
          units={units}
          y={columnHeight - textHeight}
        />
        {groups.map(([group, elements], groupIndex) => (
          <ChartSvg
            key={groupIndex}
            preserveAspectRatio={'none'}
            strokeWidth={textHeight / 14}
            viewBox={'portrait'}
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
                    ref={childMethodsRef}
                  >
                    {textWidth > columnWidth ? (
                      <CondensedText factor={columnWidth / textWidth}>
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
              d={`m${0} ${columnHeight + textHeight}h${VIEWPORT_WIDTH}`}
              stroke={'black'}
            />
            <SvgTypography
              textAnchor={'middle'}
              dominantBaseline={'hanging'}
              x={VIEWPORT_HEIGHT / 2}
              y={columnHeight + textHeight}
            >
              {group}
            </SvgTypography>
          </ChartSvg>
        ))}
      </GroupsBox>
    </View>
  );
}
