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

const defaultBody = { elements: [] };

/**
 * @description Action buttons to edit currently selected chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartToolbar({
  body,
  children,
  format,
  ...toolbarProps
}: Props) {
  return (
    !!format &&
    (format.kind === chartTypes.BAR ? (
      <BarChartToolbar
        {...toolbarProps}
        body={body || defaultBody}
        format={format}
      >
        {children}
      </BarChartToolbar>
    ) : format.kind === chartTypes.COLUMN ? (
      <ColumnChartToolbar
        {...toolbarProps}
        body={body || defaultBody}
        format={format}
      >
        {children}
      </ColumnChartToolbar>
    ) : format.kind === chartTypes.LINE ? (
      <LineChartToolbar
        {...toolbarProps}
        body={body || defaultBody}
        format={format}
      >
        {children}
      </LineChartToolbar>
    ) : format.kind === chartTypes.PIE ? (
      <PieChartToolbar
        {...toolbarProps}
        body={body || defaultBody}
        format={format}
      >
        {children}
      </PieChartToolbar>
    ) : (
      <Toolbar>{children}</Toolbar>
    ))
  );
}
