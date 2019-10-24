// @flow
import * as React from 'react';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import type { BlocksAction } from '@seine/core';
import styled from 'styled-components/macro';

type Props = {
  dispatch: (BlocksAction) => any,
  textAlignment: 'left' | 'center' | 'right',
  value: string,
};

const Input = styled.input`
  && {
    border: none;
    font: inherit;
    line-height: inherit;
    text-align: ${({ textAlignment }) => textAlignment};
    width: 100%;
  }
`;

/**
 * @description Input to edit a title of chart legend item
 * @returns {React.Node}
 */
export default function ChartTitleInput({
  dispatch,
  textAlignment,
  value,
}: Props) {
  return (
    <Input
      onChange={({ currentTarget }) =>
        dispatch({
          type: UPDATE_BLOCK_BODY,
          body: { title: currentTarget.value },
        })
      }
      textAlignment={textAlignment}
      value={value}
    />
  );
}
