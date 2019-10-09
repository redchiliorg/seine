// @flow
import * as React from 'react';
import type { Action, BlockId } from '@seine/core';
import { DELETE_SELECTED_BLOCKS } from '@seine/core';

import ActionButton from './ActionButton';

type Props = {
  dispatch: (Action) => any,
  selection: BlockId[],
};
/**
 * @description Common block actions.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockDeleteButton({
  children = 'Delete block',
  dispatch,
  selection,
}: Props) {
  return (
    selection.length > 0 && (
      <ActionButton
        color={'secondary'}
        title={'Delete current selection'}
        dispatch={dispatch}
        type={DELETE_SELECTED_BLOCKS}
      >
        {children}
      </ActionButton>
    )
  );
}
