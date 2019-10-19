// @flow
import * as React from 'react';
import {
  CREATE_BOTTOM_BLOCK,
  CREATE_LEFT_BLOCK,
  CREATE_RIGHT_BLOCK,
  CREATE_TOP_BLOCK,
} from '@seine/core';
import styled, { css } from 'styled-components/macro';
import { Box, Grid } from '@material-ui/core';

import type { Props as FabProps } from './BlockAddFab';
import BlockAddFab from './BlockAddFab';

const Container = styled(Box)`
  && {
    top: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 999;
    ${({ isSelected = false }: Props) =>
      isSelected
        ? css`
            border: 1px dashed blue;
            pointer-events: none;
          `
        : css`
            border: 1px solid transparent;
            pointer-events: all;
            & > * {
              pointer-events: none;
              & > * {
                pointer-events: all;
              }
            }
          `}
  }
`;

const Group = styled(Grid)`
  && {
    ${({ extended, theme }) => css`
      height: calc(100% + ${extended ? 2 * theme.spacing(5) : 0}px);
      left: 0;
      position: absolute;
      top: -${extended ? theme.spacing(5) : 0}px;
    `}
  }
`;

const Item = styled(Grid)`
  && {
    ${({ direction }) => css`
      align-items: center;
      display: flex;
      opacity: 0;
      :hover {
        opacity: 1;
      }
      transition: opacity 0.1s;
      ${direction === 'column'
        ? css`
            width: 100%;
          `
        : css`
            height: 100%;
          `}
    `}
  }
`;

type Props = FabProps & {
  extended?: boolean,
};

/**
 * @description Block overlay with action buttons.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockActions({
  dispatch,
  extended,
  id,
  addButtonRenderMap,
  ...containerProps
}: Props) {
  return (
    <Container {...containerProps}>
      <Group
        alignItems={'center'}
        container
        extended={extended}
        justify={'space-between'}
      >
        <Item item>
          <BlockAddFab
            addButtonRenderMap={addButtonRenderMap}
            dispatch={dispatch}
            id={id}
            type={CREATE_LEFT_BLOCK}
          />
        </Item>
        <Item item>
          <BlockAddFab
            addButtonRenderMap={addButtonRenderMap}
            dispatch={dispatch}
            id={id}
            type={CREATE_RIGHT_BLOCK}
          />
        </Item>
      </Group>

      <Group
        alignItems={'center'}
        container
        direction={'column'}
        extended={extended}
        justify={'space-between'}
      >
        <Item container item direction={'column'}>
          <BlockAddFab
            addButtonRenderMap={addButtonRenderMap}
            dispatch={dispatch}
            id={id}
            type={CREATE_TOP_BLOCK}
          />
        </Item>
        <Item container item direction={'column'}>
          <BlockAddFab
            addButtonRenderMap={addButtonRenderMap}
            dispatch={dispatch}
            id={id}
            type={CREATE_BOTTOM_BLOCK}
          />
        </Item>
      </Group>
    </Container>
  );
}
