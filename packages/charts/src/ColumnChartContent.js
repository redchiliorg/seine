// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import type { ChartElement } from '@seine/core';

import {
  defaultChartDy,
  defaultChartMinValue,
  defaultChartPalette,
  defaultChartUnits,
  defaultChartYAxis,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './constants';
import { useGroupedElements } from './helpers';
import ChartAxis from './ChartAxis';

type Props = {
  elements: ChartElement[],
  maxValue: number,

  dy?: number,
  minValue?: number,
  palette?: string[],
  units?: string,
  yAxis?: boolean,
};

const GUTTER_WIDTH = VIEWPORT_WIDTH / 10;

/**
 * @description Column chart content block renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function ColumnChartContent({
  elements,
  maxValue: initialMaxValue,
  minValue: initialMinValue = defaultChartMinValue,

  dy = defaultChartDy,
  palette = defaultChartPalette,
  units = defaultChartUnits,
  yAxis = defaultChartYAxis,

  dx,
  legend,
  xAxis,
  paletteKey,

  groupTitleAs: GroupTitle = SvgTypography,
  elementValueAs: ElementValue = SvgTypography,
  elementRectAs: ElementRect = 'rect',
  ...metaProps
}: Props) {
  const [maxValue, minValue, titledElements, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  const [methods, childMethodsRef] = useTypographyChildrenMethods(
    titledElements.length
  );
  const scaledTextHeight = methods.getScaledHeight();

  const groupWidth = (VIEWPORT_WIDTH - 2 * GUTTER_WIDTH) / groups.length;
  const columnHeight = VIEWPORT_HEIGHT;

  return [
    ...groups.map(([group, groupElements], groupIndex) => {
      const columnWidth = groupWidth / (groupElements.length + 1);
      return (
        <g strokeWidth={scaledTextHeight / 40} key={groupIndex}>
          {[
            ...groupElements.map(({ value }, index) => {
              const rectHeight =
                columnHeight *
                ((Math.max(minValue, Math.min(maxValue, value)) - minValue) /
                  (maxValue - minValue));
              const fill = palette[index % palette.length];

              return [
                <ElementRect
                  {...metaProps}
                  fill={fill}
                  height={rectHeight}
                  width={columnWidth}
                  x={
                    GUTTER_WIDTH +
                    groupWidth * groupIndex +
                    (index + 0.5) * columnWidth
                  }
                  y={columnHeight - rectHeight}
                  key={`selection.${index}`}
                  meta={{ ...groupElements[index], index }}
                />,
                <ElementValue
                  {...metaProps}
                  fill={fill}
                  ref={childMethodsRef}
                  textAnchor={'middle'}
                  width={columnWidth}
                  x={
                    GUTTER_WIDTH +
                    groupWidth * groupIndex +
                    (index + 1) * columnWidth
                  }
                  y={columnHeight - rectHeight}
                  key={`value.${groupElements.length * groupIndex + index}`}
                  meta={groupElements[index]}
                >
                  {value}
                  {units}
                </ElementValue>,
              ];
            }),
            <path
              d={`m${GUTTER_WIDTH +
                groupIndex * groupWidth +
                columnWidth / 4} ${VIEWPORT_HEIGHT}h${columnWidth *
                groupElements.length +
                columnWidth / 2}`}
              stroke={'black'}
              key={'line'}
            />,
            <GroupTitle
              {...metaProps}
              textAnchor={'middle'}
              dominantBaseline={'hanging'}
              key={'group'}
              x={GUTTER_WIDTH + groupIndex * groupWidth + groupWidth / 2}
              y={VIEWPORT_HEIGHT}
              width={columnWidth * groupElements.length}
              meta={group}
            >
              {group}
            </GroupTitle>,
          ]}
        </g>
      );
    }),
    !!yAxis && (
      <g key={'axis'} strokeWidth={scaledTextHeight / 40}>
        <ChartAxis
          arrow
          finite
          direction={'up'}
          key={'axis'}
          length={VIEWPORT_HEIGHT}
          max={maxValue}
          step={dy}
          units={units}
          y={VIEWPORT_HEIGHT}
          maxWidth={GUTTER_WIDTH}
        />
      </g>
    ),
  ];
}
