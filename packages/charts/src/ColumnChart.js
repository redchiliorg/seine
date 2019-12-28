// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import {
  Canvas,
  ForeignObject,
  useSvgScale,
  useTextMetrics,
} from '@seine/styles';

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
import ColumnChartGroup from './ColumnChartGroup';
import ChartTitle from './ChartTitle';
import ChartAxis from './ChartAxis';
import ChartSvg from './ChartSvg';

type Props = $Rest<ChartProps, {| kind: string |}> & {
  as?: React.ElementType,
};

const GroupsBox = styled.div`
  display: flex;
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

const ChartAxisSvg = styled(ChartSvg)`
  ${({ minWidth }) =>
    typeof minWidth === 'number'
      ? css`
          flex-basis: ${minWidth}px;
          min-width: ${minWidth}px;
        `
      : css`
          flex-basis: ${minWidth};
          min-width: ${minWidth};
        `}
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
  const [maxValue, minValue, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );
  const [xScale, yScale, svgRef] = useSvgScale();
  const [canvas, setCanvas] = React.useState(null);
  let [textWidth, textHeight] = useTextMetrics(
    `${elements.reduce(
      (found, { value }) =>
        `${value}`.length > found.length ? `${value}` : found,
      ''
    )} `,
    canvas
  );
  textWidth *= xScale;
  textHeight *= yScale;

  return (
    <View {...viewProps}>
      <ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>
      <GroupsBox height={'100%'} width={'100%'}>
        {!!yAxis && (
          <ChartAxisSvg
            meetOrSlice={'slice'}
            textAlignment={'right'}
            viewBox={'portrait'}
            height={VIEWPORT_WIDTH}
            minWidth={textWidth / xScale}
          >
            <ChartAxis
              direction={'up'}
              finite
              length={VIEWPORT_WIDTH - 2 * textHeight}
              max={maxValue}
              min={minValue}
              noLine
              step={dy}
              units={units}
              x={textWidth}
              y={VIEWPORT_WIDTH - textHeight}
            />
            <ForeignObject height={'100%'} ref={svgRef} width={'100%'}>
              <Canvas ref={setCanvas} />
            </ForeignObject>
          </ChartAxisSvg>
        )}
        {groups.map(([group, elements], index) => (
          <ColumnChartGroup
            elements={elements}
            group={group}
            height={VIEWPORT_WIDTH}
            key={index}
            minValue={minValue}
            maxValue={maxValue}
            viewBox={'portrait'}
            palette={palette}
            units={units}
            width={VIEWPORT_HEIGHT}
          />
        ))}
      </GroupsBox>
    </View>
  );
}
