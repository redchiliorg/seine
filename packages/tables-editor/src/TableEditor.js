// @flow
import * as React from 'react';
import type { BlockEditor } from '@seine/core';
import { SELECT_BLOCK, UPDATE_BLOCK_BODY } from '@seine/core';
import type { TableProps } from '@seine/tables';
import { Table } from '@seine/tables';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';

type Props = TableProps & BlockEditor;

const StyledInput = styled.input`
  && {
    background: none;
    border: 0;
    color: inherit;
    margin: 0;
    padding: 0;
    font: inherit;
    text-align: inherit;
    height: 100%;
    width: 100%;
  }
`;

/**
 * @description Table block editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableEditor({ id, dispatch, header, rows }: Props) {
  const selectBlock = useAutoCallback(() =>
    dispatch({ id, type: SELECT_BLOCK })
  );

  return (
    <Table
      header={header.map(({ text, ...column }, index) => ({
        ...column,
        text: (
          <StyledInput
            onFocus={selectBlock}
            onChange={({ currentTarget }) =>
              dispatch({
                id,
                type: UPDATE_BLOCK_BODY,
                body: {
                  header: [
                    ...header.slice(0, index),
                    { ...column, text: currentTarget.value },
                    ...header.slice(index + 1),
                  ],
                },
              })
            }
            value={text}
          />
        ),
      }))}
      rows={rows.map((row, rowIndex) =>
        row.map(({ text, ...column }, index) => ({
          ...column,
          text: (
            <StyledInput
              onFocus={selectBlock}
              onChange={({ currentTarget }) =>
                dispatch({
                  id,
                  type: UPDATE_BLOCK_BODY,
                  body: {
                    rows: [
                      ...rows.slice(0, rowIndex),
                      [
                        ...row.slice(0, index),
                        { ...column, text: currentTarget.value },
                        ...row.slice(index + 1),
                      ],
                      ...rows.slice(rowIndex + 1),
                    ],
                  },
                })
              }
              value={text}
            />
          ),
        }))
      )}
    />
  );
}