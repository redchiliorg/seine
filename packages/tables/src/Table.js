// @flow
import * as React from 'react';
import type { TableBody, TableCell, TableFormat } from '@seine/core';
import styled, { css } from 'styled-components/macro';

export type Props = TableBody & TableFormat;

const StyledTable = styled.table`
  ${({
    theme: {
      typography: { body1 },
    },
  }) => css`
    ${body1};
    width: 100%;
    th,
    td {
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
      line-height: 1.5;
      padding: 2rem;
      white-space: pre-wrap;
    }

    & > thead {
      background-color: #ebebeb;
      & > tr > th {
        font-weight: 600;
      }
    }

    & > tbody {
      & > tr:nth-child(2n + 1) {
        background-color: #fdfdfd;
        border: none;
      }
      & > tr:nth-child(2n) {
        background-color: #f7f7f7;
        border: none;
      }
    }
  `}
`;

const StyledTableCell = styled.td`
  ${({ align = 'left', bold = false, italic = false }: TableCell) => css`
    text-align: ${align};
    font-weight: ${bold ? 'bold' : 'normal'};
    font-style: ${italic ? 'italic' : 'normal'};
  `}
`;
/**
 * @description Table block render component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Table({ header, rows }: Props) {
  return (
    <StyledTable>
      <thead>
        <tr>
          {header.map(({ text }, index) => (
            <th key={index}>{text}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((columns, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map(({ text, ...cell }, columnIndex) => (
              <StyledTableCell key={columnIndex} {...cell}>
                {text}
              </StyledTableCell>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
