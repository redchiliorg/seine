// @flow
import * as React from 'react';
import type { Action, Block, BlockId } from '@seine/core';
import { BlockToolbarGroup, Toolbar } from '@seine/ui';

import AddTextBlockButton from './AddTextBlockButton';
import AddSiblingTextBlocksButton from './AddSiblingTextsButton';
import AddTitledPieActionButton from './AddPieButton';

type Props = Block & {
  dispatch: (Action) => any,
  selection: BlockId[],
};

/**
 * @description Default toolbar with predefined content block layouts.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ContentToolbar({
  dispatch,
  selection,
  ...block
}: Props) {
  return (
    <Toolbar>
      <Toolbar.Group>
        <AddTextBlockButton dispatch={dispatch} id={block.id} />
        <AddSiblingTextBlocksButton dispatch={dispatch} id={block.id} />
        <AddTitledPieActionButton dispatch={dispatch} id={block.id} />
      </Toolbar.Group>
      <BlockToolbarGroup dispatch={dispatch} selection={selection} />
    </Toolbar>
  );
}
