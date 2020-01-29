// @flow
import * as React from 'react';
import type { TableBody, TableFormat } from '@seine/core';
import styled, { css } from 'styled-components/macro';

export type Props = TableBody & TableFormat;

const StyledTable = styled.table`
  ${({
    theme: {
      typography: { body1 },
    },
  }) => css`
    ${body1}

    width: 100%;

    th,
    td {
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
      padding: 2rem;
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
            {columns.map(({ text }, columnIndex) => (
              <td key={columnIndex}>{text}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
