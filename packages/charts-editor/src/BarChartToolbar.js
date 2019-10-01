// @flow
import * as React from 'react';
import type { Action, Block, BlockId, ChartBody } from '@seine/core';
import { createBlockElement, UPDATE_BLOCK_BODY } from '@seine/core';
import type { BlockToolbarGroup } from '@seine/ui';
import { ActionButton, Toolbar } from '@seine/ui';
import {
  defaultChartBody,
  defaultChartEditor,
  defaultChartFormat,
} from '@seine/charts';
import ChartElementColorButton from './ChartElementColorButton';
import ChartElementRemoveButton from './ChartElementRemoveButton';

type Props = Block & {
  dispatch: (Action) => any,
  body: ChartBody,
  selection: BlockId[],
  children: React.Element<typeof BlockToolbarGroup>,
};

/**
 * @description Action buttons to edit currently selected bar chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartToolbar({
  body,
  children,
  dispatch,
  editor,
  format,
  id,
}: Props) {
  body = body || defaultChartBody;
  editor = editor || defaultChartEditor;
  format = format || defaultChartFormat;
  return (
    <Toolbar>
      <Toolbar.Group>
        <AddBarChartElementButton
          body={body}
          dispatch={dispatch}
          editor={editor}
          format={format}
          id={id}
        />
        {editor.selection > -1 && (
          <>
            <ChartElementRemoveButton
              body={body}
              dispatch={dispatch}
              editor={editor}
              format={format}
              id={id}
            />
            <ChartElementColorButton
              body={body}
              dispatch={dispatch}
              editor={editor}
              format={format}
              id={id}
            />
          </>
        )}
      </Toolbar.Group>
      {children}
    </Toolbar>
  );
}

// eslint-disable-next-line
function AddBarChartElementButton({ id, dispatch, body }) {
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
              value: 0,
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
function RemoveBarChartElementButton({ body, dispatch, id }) {
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
