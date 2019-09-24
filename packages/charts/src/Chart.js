// @flow
import * as React from 'react';
import type { ChartType } from '@seine/core';
import { chartTypes } from '@seine/core';

import BarChart from './BarChart';
import ColumnChart from './ColumnChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import type { ChartProps } from './types';

type Config = {
  chartRenderMap: {
    [ChartType]: React.ComponentType<ChartProps>,
  },
  as: React.ElementType,
};

type Props = ChartProps & $Shape<Config>;

export const defaultChartRenderMap = {
  [chartTypes.BAR]: BarChart,
  [chartTypes.COLUMN]: ColumnChart,
  [chartTypes.LINE]: LineChart,
  [chartTypes.PIE]: PieChart,
};

/**
 * @description Switch to chart render component by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Chart({
  kind = chartTypes.BAR,
  chartRenderMap: { [kind]: ExactChart } = defaultChartRenderMap,
  ...chartProps
}: Props) {
  return <ExactChart {...chartProps} />;
}
