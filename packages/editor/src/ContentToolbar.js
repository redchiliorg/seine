// @flow
import * as React from 'react';
import type { Action, BlockId } from '@seine/core';
import { Toolbar, BlockToolbarGroup } from '@seine/ui';

import {
  ADD_DESCRIPTION_WITH_TITLED_PIE_ACTION,
  ADD_SIBLING_TEXT_BLOCKS_ACTION,
  ADD_TEXT_BLOCK_ACTION,
  ADD_TITLED_PIE_ACTION,
  ADD_TITLED_PIE_WITH_DESCRIPTION_ACTION,
} from './constants';

type Props = {
  dispatch: (Action) => any,
  selection: BlockId[],
};

/**
 * @description Default toolbar with predefined content block layouts.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ContentToolbar({ dispatch, selection }: Props) {
  return (
    <Toolbar>
      <Toolbar.Group>
        <Toolbar.ActionButton
          title={'Add text block'}
          dispatch={dispatch}
          action={ADD_TEXT_BLOCK_ACTION}
        >
          + text
        </Toolbar.ActionButton>

        <Toolbar.ActionButton
          title={'Add sibling text blocks'}
          dispatch={dispatch}
          action={ADD_SIBLING_TEXT_BLOCKS_ACTION}
        >
          + 2 text columns
        </Toolbar.ActionButton>
      </Toolbar.Group>

      <Toolbar.Separator />

      <Toolbar.Group>
        <Toolbar.ActionButton
          title={'Add titled pie'}
          dispatch={dispatch}
          action={ADD_TITLED_PIE_ACTION}
        >
          + pie chart
        </Toolbar.ActionButton>

        <Toolbar.ActionButton
          title={'Add titled pie with description'}
          dispatch={dispatch}
          action={ADD_TITLED_PIE_WITH_DESCRIPTION_ACTION}
        >
          + pie chart & text
        </Toolbar.ActionButton>

        <Toolbar.ActionButton
          title={'Add description with titled pie'}
          dispatch={dispatch}
          action={ADD_DESCRIPTION_WITH_TITLED_PIE_ACTION}
        >
          + text & pie chart
        </Toolbar.ActionButton>
      </Toolbar.Group>
      <BlockToolbarGroup dispatch={dispatch} selection={selection} />
    </Toolbar>
  );
}
