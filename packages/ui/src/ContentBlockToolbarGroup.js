// @flow
import * as React from 'react';
import styled from 'styled-components';
import type { Action } from '@seine/core';
import { DELETE_SELECTED_BLOCKS } from '@seine/core';

import Toolbar from './Toolbar';

type Props = {
  dispatch: (Action) => any,
};

const ToolbarGroup = styled(Toolbar.Group)`
  margin-left: auto;
`;

/**
 * @description Common block actions.
 * @param {Function} dispatch
 * @returns {React.Node}
 */
export default function ContentBlockToolbarGroup({ dispatch }: Props) {
  return (
    <ToolbarGroup>
      <Toolbar.ActionButton
        color={'danger'}
        title={'Delete current selection'}
        dispatch={dispatch}
        action={{ type: DELETE_SELECTED_BLOCKS }}
      >
        Delete
      </Toolbar.ActionButton>
    </ToolbarGroup>
  );
}
