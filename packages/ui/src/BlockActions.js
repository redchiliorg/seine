// @flow
import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import type { BlockId, BlocksAction } from '@seine/core';
import {
  CREATE_BOTTOM_BLOCK,
  CREATE_LEFT_BLOCK,
  CREATE_RIGHT_BLOCK,
  CREATE_TOP_BLOCK,
} from '@seine/core';
import styled, { css } from 'styled-components';

import BlockAddFab from './BlockAddFab';

type Props = {
  children?: React.Node,
  dispatch: (BlocksAction) => any,
  id: BlockId,
};

const Container = Box;

const Group = styled(Grid)`
  && {
    ${({ theme, extended }) => css`
      height: calc(100% + ${extended ? 2 * theme.spacing(5) : 0}px);
      left: 0;
      position: absolute;
      pointer-events: none;
      top: -${extended ? theme.spacing(5) : 0}px;
      z-index: 999;
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
      pointer-events: all;
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

/**
 * @description Block overlay with action buttons.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockActions({ extended = false, ...fabProps }: Props) {
  return (
    <Container extended={extended}>
      <Group
        alignItems={'center'}
        container
        extended={extended}
        justify={'space-between'}
      >
        <Item item>
          <BlockAddFab {...fabProps} type={CREATE_LEFT_BLOCK} />
        </Item>
        <Item item>
          <BlockAddFab {...fabProps} type={CREATE_RIGHT_BLOCK} />
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
          <BlockAddFab {...fabProps} type={CREATE_TOP_BLOCK} />
        </Item>
        <Item container item direction={'column'}>
          <BlockAddFab {...fabProps} type={CREATE_BOTTOM_BLOCK} />
        </Item>
      </Group>
    </Container>
  );
}
