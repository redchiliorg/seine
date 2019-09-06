// @flow
import * as React from 'react';
import type { Action, Block, PieBody, BlockId } from '@seine/core';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import { ActionButton, BlockToolbarGroup, Toolbar } from '@seine/ui';

type Props = Block & {
  dispatch: (Action) => any,
  body: PieBody,
  selection: BlockId[],
};

const defaultBody = { elements: [] };

/**
 * Todo: move body.edit to editor specific property key of a block.
 *
 * @description Action buttons to edit currently selected pie chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieToolbar({ id, body, dispatch, selection }: Props) {
  body = body || defaultBody;
  return (
    <Toolbar>
      <Toolbar.Group>
        <ActionButton
          id={id}
          title={'Add new slice'}
          dispatch={dispatch}
          type={UPDATE_BLOCK_BODY}
          body={React.useMemo(
            () => ({
              elements: [
                ...body.elements,
                {
                  title: `Item #${body.elements.length}`,
                  percent: 10,
                },
              ],
            }),
            [body.elements]
          )}
        >
          Add slice
        </ActionButton>
      </Toolbar.Group>
      <BlockToolbarGroup dispatch={dispatch} selection={selection} />
    </Toolbar>
  );
}
