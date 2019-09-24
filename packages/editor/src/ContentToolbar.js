// @flow
import * as React from 'react';
import type { Action, Block } from '@seine/core';
import { typeof BlockToolbarGroup, Toolbar } from '@seine/ui';

import AddTextBlockButton from './AddTextBlockButton';
import AddSiblingTextsButton from './AddSiblingTextsButton';
import AddPieButton from './AddPieChartButton';
import AddChartButton from './AddBarChartButton';
import AddColumnChartButton from './AddColumnChartButton';
import AddLineChartButton from './AddLineChartButton';

type Props = Block & {
  blocks: $ReadOnlyArray<Block>,
  dispatch: (Action) => any,
  children: React.Element<typeof BlockToolbarGroup>,
};

/**
 * @description Default toolbar with predefined content block layouts.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ContentToolbar({
  id,
  blocks,
  dispatch,
  children,
}: Props) {
  return (
    <Toolbar>
      <Toolbar.Group>
        <AddTextBlockButton dispatch={dispatch} id={id} blocks={blocks} />
        <AddSiblingTextsButton dispatch={dispatch} id={id} blocks={blocks} />
        <AddPieButton dispatch={dispatch} id={id} blocks={blocks} />
        <AddChartButton dispatch={dispatch} id={id} blocks={blocks} />
        <AddColumnChartButton dispatch={dispatch} id={id} blocks={blocks} />
        <AddLineChartButton dispatch={dispatch} id={id} blocks={blocks} />
      </Toolbar.Group>
      {children}
    </Toolbar>
  );
}
