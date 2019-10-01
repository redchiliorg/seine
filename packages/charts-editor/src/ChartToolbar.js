// @flow
import * as React from 'react';
import type { Action, Block, BlockId, ChartBody } from '@seine/core';
import { chartTypes } from '@seine/core';
import type { BlockToolbarGroup } from '@seine/ui';
import { Toolbar } from '@seine/ui';

import ColumnChartToolbar from './ColumnChartToolbar';
import BarChartToolbar from './BarChartToolbar';
import PieChartToolbar from './PieChartToolbar';
import LineChartToolbar from './LineChartToolbar';

type Props = Block & {
  dispatch: (Action) => any,
  body: ChartBody,
  selection: BlockId[],
  children: React.Element<typeof BlockToolbarGroup>,
};

const defaultFormat = {};

/**
 * @description Action buttons to edit currently selected chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartToolbar({ children, ...toolbarProps }: Props) {
  const { kind, ...format } = toolbarProps.format || defaultFormat;
  return (
    !!format &&
    (kind === chartTypes.BAR ? (
      <BarChartToolbar {...toolbarProps}>{children}</BarChartToolbar>
    ) : kind === chartTypes.COLUMN ? (
      <ColumnChartToolbar {...toolbarProps}>{children}</ColumnChartToolbar>
    ) : kind === chartTypes.LINE ? (
      <LineChartToolbar {...toolbarProps}>{children}</LineChartToolbar>
    ) : kind === chartTypes.PIE ? (
      <PieChartToolbar {...toolbarProps}>{children}</PieChartToolbar>
    ) : (
      <Toolbar>{children}</Toolbar>
    ))
  );
}
