// @flow
import * as React from 'react';

import type { Action } from './reducers/content';
import Toolbar from './ui/Toolbar';
import { UPDATE_BLOCK_BODY } from './reducers/content';
import type { Block, PieBody } from './types';
import ContentBlockToolbarGroup from './ContentBlockToolbarGroup';

type Props = Block & {
  dispatch: (Action) => any,
  body: PieBody & { edit?: boolean },
};

/**
 * Todo: move body.edit to editor specific property key of a block.
 *
 * @description Action buttons to edit currently selected pie chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieToolbar({ id, body, dispatch }: Props) {
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
      <ContentBlockToolbarGroup dispatch={dispatch} />
    </Toolbar>
  );
}
