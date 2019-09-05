// @flow
import * as React from 'react';
import type { Action, Block, PieBody, BlockId } from '@seine/core';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import { ContentBlockToolbarGroup, Toolbar } from '@seine/ui';

type Props = Block & {
  dispatch: (Action) => any,
  body: PieBody,
  selection: BlockId[],
};

/**
 * Todo: move body.edit to editor specific property key of a block.
 *
 * @description Action buttons to edit currently selected pie chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieToolbar({ id, body, dispatch, selection }: Props) {
  body = body || { elements: [] };
  return (
    <Toolbar>
      <Toolbar.Group>
        <Toolbar.ActionButton
          title={'Add new slice'}
          dispatch={dispatch}
          action={{
            id,
            type: UPDATE_BLOCK_BODY,
            body: {
              elements: [
                ...body.elements,
                {
                  title: `Item #${body.elements.length}`,
                  color: 'gray',
                  percent: 10,
                },
              ],
            },
          }}
        >
          Add slice
        </Toolbar.ActionButton>
      </Toolbar.Group>
      <ContentBlockToolbarGroup dispatch={dispatch} selection={selection} />
    </Toolbar>
  );
}
