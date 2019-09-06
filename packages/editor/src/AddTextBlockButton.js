// @flow
import { ActionButton } from '@seine/ui';
import type { Action, BlockId } from '@seine/core';
import { blockTypes, CREATE_BLOCK, createBlock } from '@seine/core';
import * as React from 'react';
import { toRawContent } from '@seine/draft';

type Props = {
  id: BlockId,
  dispatch: (Action) => any,
};

export default ({ id, dispatch }: Props) => (
  <ActionButton
    title={'Add text block'}
    dispatch={dispatch}
    type={CREATE_BLOCK}
    block={React.useMemo(
      () =>
        createBlock(
          blockTypes.DRAFT,
          toRawContent('Rich text'),
          { verticalAlignment: 'center' },
          id
        ),
      [id]
    )}
  >
    + text
  </ActionButton>
);
