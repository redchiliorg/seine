// @flow
import * as React from 'react';
import styled from 'styled-components';
import type { Action, BlockId } from '@seine/core';
import { DELETE_SELECTED_BLOCKS, SELECT_BLOCK } from '@seine/core';

import Toolbar from './Toolbar';

type Props = {
  dispatch: (Action) => any,
  selection: BlockId[],
};

const ToolbarGroup = styled(Toolbar.Group)`
  margin-left: auto;
`;

const DELETE_SELECTED_SELECTION_ACTION = {
  type: DELETE_SELECTED_BLOCKS,
};

/**
 * @description Common block actions.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockToolbarGroup({ dispatch, selection }: Props) {
  return (
    selection.length > 0 && (
      <ToolbarGroup>
        <Toolbar.ActionButton
          color={'danger'}
          title={'Delete current selection'}
          dispatch={dispatch}
          action={DELETE_SELECTED_SELECTION_ACTION}
        >
          Delete
        </Toolbar.ActionButton>
        {selection.length === 1 && (
          <Toolbar.ActionButton
            color={'primary'}
            title={'Cancel current selection'}
            dispatch={dispatch}
            action={{
              type: SELECT_BLOCK,
              id: selection[0],
              modifier: 'sub',
            }}
          >
            Deselect
          </Toolbar.ActionButton>
        )}
      </ToolbarGroup>
    )
  );
}
