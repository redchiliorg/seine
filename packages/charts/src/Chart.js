// @flow
import * as React from 'react';
import type { ChartType } from '@seine/core';
import { chartTypes } from '@seine/core';

import BarChart from './BarChart';
import ColumnChart from './ColumnChart';
import PieChart from './PieChart';
import {
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

type Props = ChartProps & Config;

/**
 * @description Switch to chart render component by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Chart({
  elements,

  fontWeight = defaultChartFontWeight,
  lineHeight = defaultChartLineHeight,
  palette = defaultChartPalette,
  size = defaultChartSize,

  kind = chartTypes.BAR,
  chartRenderMap: { [kind]: Component } = defaultChartRenderMap,
}: Props) {
  const groups = React.useMemo(
    () =>
      elements
        .sort(({ group: left }, { group: right }) =>
          right > left ? 1 : right < left ? -1 : 0
        )
        .reduce(
          ([last, ...groups], { group = null, ...element }) =>
            last && last.title === group
              ? [{ ...last, elements: [...last.elements, element] }, ...groups]
              : [
                  { title: group, elements: [element] },
                  ...(last ? [last] : []),
                  ...groups,
                ],
          []
        ),
    [elements]
  );

  return groups.map((group) => (
    <Component
      key={group.title}
      elements={group.elements}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      palette={palette}
      size={size}
    />
  ));
}
