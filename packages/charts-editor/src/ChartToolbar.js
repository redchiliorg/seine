// @flow
import * as React from 'react';
import type { Action, Block, BlockId, ChartBody } from '@seine/core';
import { chartTypes } from '@seine/core';
import type { BlockToolbarGroup } from '@seine/ui';

import ColumnChartToolbar from './ColumnChartToolbar';

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
    !!(format && format.kind === chartTypes.COLUMN) && (
      <ColumnChartToolbar
        {...toolbarProps}
        body={body || defaultBody}
        format={format}
      >
        {children}
      </ColumnChartToolbar>
    )
  );
}
