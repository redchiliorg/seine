// @flow
import * as React from 'react';
import type { ChartType } from '@seine/core';
import { chartTypes } from '@seine/core';
import { useAutoEffect, useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';

import BarChart from './BarChart';
import ColumnChart from './ColumnChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import ChartLayout from './ChartLayout';
import type { ChartProps } from './types';
import {
  defaultChartLegend,
  defaultChartPalette,
  defaultChartTextAlignment,
  defaultChartTitle,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './constants';
import ChartLegend from './ChartLegend';
import { groupElements } from './helpers';
import ChartResizeContext from './ChartResizeContext';

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

const Svg = styled.svg`
  && {
    overflow: visible;
  }
`;

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
  const {
    legend = defaultChartLegend,
    palette = defaultChartPalette,
    title = defaultChartTitle,
    textAlignment = defaultChartTextAlignment,
    elements,
  } = chartProps;

  const { observer: resizeObserver } = React.useContext(ChartResizeContext);

  const resizeTargetRef = React.useRef<HTMLElement>(null);
  const { current: resizeTarget } = resizeTargetRef;

  useAutoEffect(() => {
    const { current: currentResizeTarget } = resizeTargetRef;
    if (resizeTarget !== currentResizeTarget) {
      if (resizeTarget) {
        resizeObserver.unobserve(resizeTarget);
      }
      if (currentResizeTarget) {
        resizeObserver.observe(currentResizeTarget);
      }
    }
  });

  return (
    <ChartLayout
      ref={resizeTargetRef}
      title={title}
      description={
        <ChartLegend
          palette={palette}
          elements={useAutoMemo(
            legend
              ? ExactChart === ColumnChart || ExactChart === LineChart
                ? groupElements(elements).map(([title]) => ({ title }))
                : elements
              : []
          )}
        />
      }
      textAlignment={textAlignment}
    >
      <Svg
        preserveAspectRatio="xMidYMax meet"
        width="100%"
        height="90%"
        viewBox={`0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`}
        overflow={'visible'}
      >
        <ExactChart {...chartProps} />
      </Svg>
    </ChartLayout>
  );
}
