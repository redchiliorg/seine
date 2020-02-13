// @flow
import * as React from 'react';
import { chartTypes } from '@seine/core';
import { useResizeTargetRef } from '@seine/styles';

import ChartLayout from './ChartLayout';
import BarChart from './BarChart';
import ColumnChart from './ColumnChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import type { ChartProps as Props } from './types';
import ChartSvg from './ChartSvg';
import { defaultChartTextAlignment, defaultChartTitle } from './constants';
import ColumnChartDescription from './ColumnChartDescription';
import LineChartDescription from './LineChartDescription';
import PieChartDescription from './PieChartDescription';
import BarChartDescription from './BarChartDescription';

/**
 * @description Switch to chart render component by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Chart({ kind = chartTypes.BAR, ...chartProps }: Props) {
  const {
    title = defaultChartTitle,
    textAlignment = defaultChartTextAlignment,
  } = chartProps;

  return (
    <ChartLayout
      ref={useResizeTargetRef()}
      title={title}
      description={
        kind === chartTypes.COLUMN ? (
          <ColumnChartDescription {...chartProps} />
        ) : kind === chartTypes.LINE ? (
          <LineChartDescription {...chartProps} />
        ) : kind === chartTypes.PIE ? (
          <PieChartDescription {...chartProps} />
        ) : kind === chartTypes.BAR ? (
          <BarChartDescription {...chartProps} />
        ) : null
      }
      textAlignment={textAlignment}
    >
      <ChartSvg>
        {kind === chartTypes.COLUMN ? (
          <ColumnChart {...chartProps} />
        ) : kind === chartTypes.BAR ? (
          <BarChart {...chartProps} />
        ) : kind === chartTypes.LINE ? (
          <LineChart {...chartProps} />
        ) : kind === chartTypes.PIE ? (
          <PieChart {...chartProps} />
        ) : null}
      </ChartSvg>
    </ChartLayout>
  );
}
