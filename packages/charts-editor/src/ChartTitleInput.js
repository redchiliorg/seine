// @flow
import * as React from 'react';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import type { BlocksAction } from '@seine/core';
import styled from 'styled-components';

type Props = {
  dispatch: (BlocksAction) => any,
  value: string,
};

const Input = styled.input`
  && {
    border: none;
    font: inherit;
    line-height: inherit;
  }
`;

/**
 * @description Input to edit a title of chart legend item
 * @returns {React.Node}
 */
export default function ChartTitleInput({ dispatch, value }: Props) {
  return (
    <Input
      onChange={({ currentTarget }) =>
        dispatch({
          type: UPDATE_BLOCK_BODY,
          body: { title: currentTarget.value },
        })
      }
      value={value}
    />
  );
}
