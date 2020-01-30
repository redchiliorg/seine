// @flow
import * as React from 'react';
import type { TableBody, TableFormat, ToolbarProps } from '@seine/core';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import { ActionButton, Toolbar } from '@seine/ui';
import {
  FormatBold,
  FormatItalic,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { defaultTableBody, defaultTableCell } from '@seine/tables';

import TableCellButton from './TableCellButton';
import { defaultTableEditor } from './constants';

type Props = {
  ...ToolbarProps,
  children: React.Node,
  body: TableBody,
  format: TableFormat,
};

/**
 * @description Action buttons to edit currently selected toolbar.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableToolbar({
  children,
  body,
  dispatch,
  id,
  editor,
}: Props) {
  const { header, rows } = body || defaultTableBody;
  const { rowIndex, columnIndex } = editor || defaultTableEditor;
  return (
    <Toolbar>
      {children}
      <ActionButton
        body={
          columnIndex > -1
            ? {
                header: [
                  ...header.slice(0, columnIndex + 1),
                  defaultTableCell,
                  ...header.slice(columnIndex + 1),
                ],
                rows: rows.map((row) => [
                  ...row.slice(0, columnIndex + 1),
                  defaultTableCell,
                  ...row.slice(columnIndex + 1),
                ]),
              }
            : {
                header: [...header, defaultTableCell],
                rows: rows.map((row) => [...row, defaultTableCell]),
              }
        }
        id={id}
        type={UPDATE_BLOCK_BODY}
        dispatch={dispatch}
      >
        Add column
      </ActionButton>

      <ActionButton
        disabled={!(rows.length && rows[0].length > 1)}
        body={{
          header: [
            ...header.slice(0, columnIndex),
            ...header.slice(columnIndex + 1),
          ],
          rows: rows.map((row) => [
            ...row.slice(0, columnIndex),
            ...row.slice(columnIndex + 1),
          ]),
        }}
        id={id}
        type={UPDATE_BLOCK_BODY}
        dispatch={dispatch}
      >
        Remove column
      </ActionButton>

      <ActionButton
        body={{
          rows:
            columnIndex > -1
              ? [
                  ...rows.slice(0, rowIndex + 1),
                  rows[0].map(() => defaultTableCell),
                  ...rows.slice(rowIndex + 1),
                ]
              : [...rows, rows.map(() => defaultTableCell)],
        }}
        id={id}
        type={UPDATE_BLOCK_BODY}
        dispatch={dispatch}
      >
        Add row
      </ActionButton>
      <ActionButton
        body={{
          rows: [...rows.slice(0, rowIndex), ...rows.slice(rowIndex + 1)],
        }}
        disabled={!(rows.length > 1)}
        id={id}
        type={UPDATE_BLOCK_BODY}
        dispatch={dispatch}
      >
        Remove row
      </ActionButton>

      <Toolbar.Separator />

      {rowIndex > -1 && columnIndex > -1 && (
        <>
          <TableCellButton
            {...body}
            as={IconButton}
            dispatch={dispatch}
            id={id}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            cell={{ bold: !rows[rowIndex][columnIndex].bold }}
          >
            <FormatBold
              {...(!rows[rowIndex][columnIndex].bold && { color: 'disabled' })}
            />
          </TableCellButton>

          <TableCellButton
            {...body}
            as={IconButton}
            dispatch={dispatch}
            id={id}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            cell={{ italic: !rows[rowIndex][columnIndex].italic }}
          >
            <FormatItalic
              {...(!rows[rowIndex][columnIndex].italic && {
                color: 'disabled',
              })}
            />
          </TableCellButton>

          <TableCellButton
            {...body}
            as={IconButton}
            dispatch={dispatch}
            id={id}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            cell={{ align: 'left' }}
          >
            <FormatAlignLeft
              {...(rows[rowIndex][columnIndex].align !== 'left' && {
                color: 'disabled',
              })}
            />
          </TableCellButton>

          <TableCellButton
            {...body}
            as={IconButton}
            dispatch={dispatch}
            id={id}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            cell={{ align: 'center' }}
          >
            <FormatAlignCenter
              {...(rows[rowIndex][columnIndex].align !== 'center' && {
                color: 'disabled',
              })}
            />
          </TableCellButton>

          <TableCellButton
            {...body}
            as={IconButton}
            dispatch={dispatch}
            id={id}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            cell={{ align: 'right' }}
          >
            <FormatAlignRight
              {...(rows[rowIndex][columnIndex].align !== 'right' && {
                color: 'disabled',
              })}
            />
          </TableCellButton>
        </>
      )}
    </Toolbar>
  );
}
