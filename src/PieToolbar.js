// @flow
import * as React from 'react';

import type { Action } from './reducers/content';
import Toolbar from './ui/Toolbar';
import { UPDATE_BLOCK_DATA } from './reducers/content';
import type { ContentBlock, PieData } from './types';
import ContentBlockToolbarGroup from './ContentBlockToolbarGroup';

type Props = ContentBlock & {
  dispatch: (Action) => any,
  data: PieData & { edit?: boolean },
};

/**
 * Todo: move data.edit to editor specific property key of a block.
 *
 * @description Action buttons to edit currently selected pie chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieToolbar({ id, data, dispatch }: Props) {
  return (
    <Toolbar>
      <Toolbar.Group>
        {data.edit ? (
          <Toolbar.ActionButton
            color={'primary'}
            title={'Switch pie to view mode'}
            dispatch={dispatch}
            action={{
              type: UPDATE_BLOCK_DATA,
              id,
              data: { edit: false },
            }}
          >
            View pie
          </Toolbar.ActionButton>
        ) : (
          <Toolbar.ActionButton
            color={'primary'}
            title={'Switch pie to edit mode'}
            dispatch={dispatch}
            action={{
              type: UPDATE_BLOCK_DATA,
              id,
              data: { edit: true },
            }}
          >
            Edit pie
          </Toolbar.ActionButton>
        )}
        <Toolbar.ActionButton
          title={'Add new slice'}
          dispatch={dispatch}
          action={{
            id,
            type: UPDATE_BLOCK_DATA,
            data: {
              elements: [
                ...data.elements,
                {
                  title: `Item #${data.elements.length}`,
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
