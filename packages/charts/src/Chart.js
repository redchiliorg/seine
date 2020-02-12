// @flow
import * as React from 'react';
import type { ChartType } from '@seine/core';
import { chartTypes } from '@seine/core';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import ResizeObserver from 'resize-observer-polyfill';

import BarChart from './BarChart';
import ColumnChart from './ColumnChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import ChartLayout from './ChartLayout';
import ChartTitle from './ChartTitle';
import type { ChartProps } from './types';
import {
  defaultChartLegend,
  defaultChartPalette,
  defaultChartTextAlignment,
  defaultChartTitle,
  defaultChartXAxis,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './constants';
import ChartLegend from './ChartLegend';
import { groupElements } from './helpers';

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

  legend = defaultChartLegend,
  palette = defaultChartPalette,
  title = defaultChartTitle,
  textAlignment = defaultChartTextAlignment,
  xAxis = defaultChartXAxis,

  elements,

  ...chartProps
}: Props) {
  const [resized, setResized] = React.useState(false);
  const resizeObservable = useAutoMemo(
    new ResizeObserver(() => {
      setResized(true);
    })
  );

  useAutoEffect(() => {
    if (resized) {
      setResized(false);
    }
  });

  const legendItems = useAutoMemo(
    ExactChart === ColumnChart
      ? groupElements(elements).map(([title]) => ({ title }))
      : elements
  );

  return (
    <ChartLayout
      ref={useAutoCallback((resizeTarget) => {
        if (resizeTarget) {
          resizeObservable.disconnect();
          resizeObservable.observe(resizeTarget);
        }
      })}
      title={<ChartTitle textAlignment={textAlignment}>{title}</ChartTitle>}
      description={
        legend ? <ChartLegend palette={palette} elements={legendItems} /> : ''
      }
    >
      <svg
        preserveAspectRatio="xMidYMax meet"
        width="100%"
        height="90%"
        viewBox={`0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`}
        overflow={'visible'}
      >
        <ExactChart {...chartProps} elements={elements} palette={palette} />
      </svg>
    </ChartLayout>
  );
}
