// @flow
import * as React from 'react';
import styled from 'styled-components';
import type { Action, BlockId } from '@seine/core';
import { DELETE_SELECTED_BLOCKS, SELECT_BLOCK } from '@seine/core';

import Toolbar from './Toolbar';
import ActionButton from './ActionButton';

type Props = {
  dispatch: (Action) => any,
  selection: BlockId[],
};

const ToolbarGroup = styled(Toolbar.Group)`
  margin-left: auto;
`;

/**
 * @description Common block actions.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockToolbarGroup({ dispatch, selection }: Props) {
  return (
    selection.length > 0 && (
      <ToolbarGroup>
        <ActionButton
          color={'danger'}
          title={'Delete current selection'}
          dispatch={dispatch}
          type={DELETE_SELECTED_BLOCKS}
        >
          Delete
        </ActionButton>
        {selection.length === 1 && (
          <ActionButton
            color={'primary'}
            title={'Cancel current selection'}
            dispatch={dispatch}
            type={SELECT_BLOCK}
            id={selection[0]}
            modifier={'sub'}
          >
            Deselect
          </ActionButton>
        )}
      </ToolbarGroup>
    )
  );
}
