// @flow
import * as React from 'react';
import { blockTypes, CREATE_BLOCK, createBlock } from '@seine/core';
import type { Action, Block, BlockId } from '@seine/core';
import { ActionButton } from '@seine/ui';
import { toRawContent } from '@seine/draft';

type Props = {
  id: BlockId,
  dispatch: (Action) => any,
  blocks: $ReadOnlyArray<Block>,
};

export default ({ id, dispatch, blocks }: Props) => (
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
      //eslint-disable-next-line
      [id, blocks]
    )}
  >
    + text
  </ActionButton>
);
