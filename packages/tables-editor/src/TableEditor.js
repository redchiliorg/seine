// @flow
import * as React from 'react';
import type { BlockEditor } from '@seine/core';
import type { TableProps } from '@seine/tables';
import { Table } from '@seine/tables';

type Props = TableProps & BlockEditor;

/**
 * @description Table block editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableEditor({ header, rows }: Props) {
  return <Table header={header} rows={rows} />;
}
