// @flow
import * as React from 'react';
import type { Action, Block } from '@seine/core';
import { BlockToolbarGroup, Toolbar } from '@seine/ui';

import AddTextBlockButton from './AddTextBlockButton';
import AddSiblingTextBlocksButton from './AddSiblingTextsButton';
import AddTitledPieActionButton from './AddPieButton';

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
        <AddSiblingTextBlocksButton
          dispatch={dispatch}
          id={id}
          blocks={blocks}
        />
        <AddTitledPieActionButton dispatch={dispatch} id={id} blocks={blocks} />
      </Toolbar.Group>
      {children}
    </Toolbar>
  );
}
