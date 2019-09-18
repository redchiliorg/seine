// @flow
import * as React from 'react';
import type { Action, Block, BlockId, ChartBody } from '@seine/core';
import {
  createTitleIdentityBlockElements,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';
import type { BlockToolbarGroup } from '@seine/ui';
import { ActionButton, Input, Label, Toolbar } from '@seine/ui';
import { groupElements, titleIdentityElements } from '@seine/charts';

type Props = Block & {
  dispatch: (Action) => any,
  body: ChartBody,
  selection: BlockId[],
  children: React.Element<typeof BlockToolbarGroup>,
};

const defaultBody = { elements: [] };

/**
 * @description Action buttons to edit currently selected chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ColumnChartToolbar({
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
        <AddColumnChartElementButton
          id={id}
          body={body}
          dispatch={dispatch}
          format={format}
        />

        <AddColumnChartGroupButton
          id={id}
          body={body}
          dispatch={dispatch}
          format={format}
        />

        <Label>min</Label>
        <Input
          onChange={React.useCallback(
            ({ currentTarget }) =>
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: { minValue: +currentTarget.value },
              }),
            [dispatch]
          )}
          type={'number'}
          value={typeof format.minValue === 'number' ? format.minValue : ''}
        />

        <Label>max</Label>
        <Input
          onChange={React.useCallback(
            ({ currentTarget }) =>
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: { maxValue: +currentTarget.value },
              }),
            [dispatch]
          )}
          type={'number'}
          value={typeof format.maxValue === 'number' ? format.maxValue : ''}
        />

        <Label>step</Label>
        <Input
          type={'number'}
          onChange={React.useCallback(
            ({ currentTarget }) =>
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: { dy: +currentTarget.value },
              }),
            [dispatch]
          )}
          value={typeof format.dy === 'number' ? format.dy : ''}
        />
      </Toolbar.Group>
      {children}
    </Toolbar>
  );
}

// eslint-disable-next-line
function AddColumnChartElementButton({ id, dispatch, format, body }) {
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
            ...createTitleIdentityBlockElements(
              groupElements(body.elements).map(([group, { length }]) => ({
                group,
                title: `Item #${length}`,
                value: format.minValue || 0,
              }))
            ),
          ],
        }),
        [body.elements, format.minValue]
      )}
    >
      Add element
    </ActionButton>
  );
}

// eslint-disable-next-line
function AddColumnChartGroupButton({ id, dispatch, format, body }) {
  const { length: groupsCount } = groupElements(body.elements);
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
            ...titleIdentityElements(body.elements).map(({ id, title }) => ({
              id,
              title,
              group: `Group #${groupsCount + 1}`,
              value: format.minValue || 0,
            })),
          ],
        }),
        [body.elements, format.minValue, groupsCount]
      )}
    >
      Add group
    </ActionButton>
  );
}
