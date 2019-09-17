// @flow
import * as React from 'react';
import type { Action, Block, ChartBody, BlockId } from '@seine/core';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import { ActionButton, typeof BlockToolbarGroup, Toolbar } from '@seine/ui';

type Props = Block & {
  dispatch: (Action) => any,
  body: ChartBody,
  selection: BlockId[],
  children: React.Element<typeof BlockToolbarGroup>,
};

const DefaultBody = { elements: [] };

/**
 * @description Action buttons to edit currently selected chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartToolbar({ id, body, dispatch, children }: Props) {
  body = body || DefaultBody;
  return (
    <Toolbar>
      <Toolbar.Group>
        <ActionButton
          id={id}
          title={'Add new element'}
          dispatch={dispatch}
          type={UPDATE_BLOCK_BODY}
          body={React.useMemo(
            () => ({
              elements: [
                ...body.elements,
                {
                  title: `Item #${body.elements.length}`,
                  value: 10,
                },
              ],
            }),
            [body.elements]
          )}
        >
          Add element
        </ActionButton>
      </Toolbar.Group>
      {children}
    </Toolbar>
  );
}
