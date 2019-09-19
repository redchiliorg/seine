// @flow
import * as React from 'react';
import type { Action, Block, BlockId, ChartBody } from '@seine/core';
import { createBlockElement, UPDATE_BLOCK_BODY } from '@seine/core';
import type { BlockToolbarGroup } from '@seine/ui';
import { ActionButton, Toolbar } from '@seine/ui';

type Props = Block & {
  dispatch: (Action) => any,
  body: ChartBody,
  selection: BlockId[],
  children: React.Element<typeof BlockToolbarGroup>,
};

const defaultBody = { elements: [] };

/**
 * @description Action buttons to edit currently selected bar chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartToolbar({
  id,
  format,
  body,
  dispatch,
  children,
}: Props) {
  body = body || defaultBody;
  return (
    <Toolbar>
      <Toolbar.Group>
        <AddPieChartElementButton
          body={body}
          dispatch={dispatch}
          format={format}
          id={id}
        />
        <RemovePieChartElementButton
          body={body}
          dispatch={dispatch}
          format={format}
          id={id}
        />
      </Toolbar.Group>
      {children}
    </Toolbar>
  );
}

// eslint-disable-next-line
function AddPieChartElementButton({ id, dispatch, body }) {
  return (
    <ActionButton
      id={id}
      title={'Add element'}
      dispatch={dispatch}
      type={UPDATE_BLOCK_BODY}
      body={React.useMemo(
        () => ({
          elements: [
            ...body.elements,
            createBlockElement({
              title: `Item #${body.elements.length + 1}`,
              value: 10,
            }),
          ],
        }),
        [body.elements]
      )}
    >
      Add item
    </ActionButton>
  );
}

// eslint-disable-next-line
function RemovePieChartElementButton({ body, dispatch, id }) {
  return (
    <ActionButton
      id={id}
      title={'Remove element'}
      dispatch={dispatch}
      type={UPDATE_BLOCK_BODY}
      body={React.useMemo(
        () => ({
          elements: body.elements.slice(0, -1),
        }),
        [body.elements]
      )}
    >
      Remove last
    </ActionButton>
  );
}
