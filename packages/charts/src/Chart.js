// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import {
  descend,
  groupBy,
  pipe,
  prop,
  sortBy,
  toPairs,
  uniq,
  map,
  filter,
  has,
  o,
} from 'ramda';
import type { ChartType } from '@seine/core';
import { chartTypes } from '@seine/core';

import BarChart from './BarChart';
import ColumnChart from './ColumnChart';
import PieChart from './PieChart';
import {
  defaultChartFontSize,
  defaultChartFontWeight,
  defaultChartLineHeight,
  defaultChartPalette,
  defaultChartSize,
} from './constants';
import type { ChartProps } from './types';

type Config = {
  chartRenderMap: {
    [ChartType]: React.ComponentType<ChartProps>,
  },
};

const defaultChartRenderMap = {
  [chartTypes.BAR]: BarChart,
  [chartTypes.COLUMN]: ColumnChart,
  [chartTypes.PIE]: PieChart,
};

type Props = ChartProps & $Shape<Config>;

const Groups = styled.div`
  display: flex;
  width: 100%;
  > hr {
    position: relative;
    top: -${defaultChartLineHeight}em;
  }
  ${({ height = 100 }) =>
    css`
      height: ${height}%;
    `}
`;

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GroupHeading = styled.h4`
  width: 100%;
  line-height: ${defaultChartLineHeight};
  text-align: center;
`;

const Legend = styled.div`
  display: flex;
  align-content: flex-start;
  justify-content: space-between;
  flex-flow: column wrap;
  border-top: 1px solid black;
  padding-top: ${2 * defaultChartLineHeight}em;
  height: 30%;
  > svg {
    height: 25%;
  }
`;

const groupElements = pipe(
  sortBy(o(descend, prop('group'))),
  groupBy(prop('group')),
  toPairs
);
const uniqTitles = pipe(
  filter(has('group')),
  map(prop('title')),
  uniq
);

/**
 * @description Switch to chart render component by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Chart({
  elements,

  fontWeight = defaultChartFontWeight,
  fontSize = defaultChartFontSize,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  size = defaultChartSize,

  kind = chartTypes.BAR,
  chartRenderMap: { [kind]: Component } = defaultChartRenderMap,
}: Props) {
  const titles = React.useMemo(() => uniqTitles(elements), [elements]);

  return (
    <>
      <Groups height={70 + 30 * !titles.length}>
        {React.useMemo(() => groupElements(elements), [elements]).map(
          ([group, elements]) => (
            <Group key={group}>
              <Component
                elements={elements}
                fontWeight={fontWeight}
                fontSize={fontSize}
                lineHeight={lineHeight}
                palette={palette}
                size={size}
              />
              {!!group && <GroupHeading>{group}</GroupHeading>}
            </Group>
          )
        )}
      </Groups>

      {titles.length > 0 && (
        <Legend>
          {titles.map((title, index) => (
            <svg
              key={index}
              fontSize={fontSize}
              fontWeight={fontWeight}
              viewBox={`0 0 ${2 * title.length} ${6}`}
              preserveAspectRatio={'xMinYMid meet'}
            >
              <rect
                width={6}
                height={6}
                fill={palette[index % palette.length]}
              />
              <text x={7} y={3.5}>
                {title}
              </text>
            </svg>
          ))}
        </Legend>
      )}
    </>
  );
}
