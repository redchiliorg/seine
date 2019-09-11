// @flow
import * as React from 'react';
import type { Action, Block } from '@seine/core';
import { typeof BlockToolbarGroup, Toolbar } from '@seine/ui';

import AddTextBlockButton from './AddTextBlockButton';
import AddSiblingTextsButton from './AddSiblingTextsButton';
import AddPieButton from './AddPieButton';
import AddBarchartButton from './AddBarchartButton';

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
        <AddBarchartButton dispatch={dispatch} id={id} blocks={blocks} />
      </Toolbar.Group>
      {children}
    </Toolbar>
  );
}
