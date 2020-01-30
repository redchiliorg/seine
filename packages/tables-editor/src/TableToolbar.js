// @flow
import * as React from 'react';
import type { ToolbarProps, TableBody, TableFormat } from '@seine/core';
import { Toolbar, ActionButton } from '@seine/ui';
import { UPDATE_BLOCK_BODY } from '@seine/core';

type Props = {
  ...ToolbarProps,
  children: React.Node,
  body: TableBody,
  format: TableFormat,
};

const defaultTableBody = {
  header: [],
  rows: [],
};

const defaultCell = { text: '' };

/**
 * @description Action buttons to edit currently selected toolbar.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableToolbar({ children, body, dispatch, id }: Props) {
  const { header, rows } = body || defaultTableBody;
  return (
    <Toolbar>
      {children}
      <ActionButton
        body={{
          header: [...header, defaultCell],
          rows: rows.map((row) => [...row, defaultCell]),
        }}
        id={id}
        type={UPDATE_BLOCK_BODY}
        dispatch={dispatch}
      >
        Add column
      </ActionButton>
      <ActionButton
        body={{
          header: header.slice(0, -1),
          rows: rows.map((row) => row.slice(0, -1)),
        }}
        id={id}
        type={UPDATE_BLOCK_BODY}
        dispatch={dispatch}
      >
        Remove column
      </ActionButton>
      <ActionButton
        body={{
          rows: [...rows, rows.map(() => defaultCell)],
        }}
        id={id}
        type={UPDATE_BLOCK_BODY}
        dispatch={dispatch}
      >
        Add row
      </ActionButton>
      <ActionButton
        body={{
          rows: rows.slice(0, -1),
        }}
        id={id}
        type={UPDATE_BLOCK_BODY}
        dispatch={dispatch}
      >
        Remove row
      </ActionButton>
    </Toolbar>
  );
}
