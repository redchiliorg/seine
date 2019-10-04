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

const Container = styled(Grid).attrs((props) => ({
  ...props,
}))`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  z-index: 999;
`;

const Item = styled(Grid)`
  display: flex;
  align-items: center;
  pointer-events: all;
  opacity: 0;
  transition: opacity 0.1s;
  &:hover {
    opacity: 1;
  }
  ${({ direction }) =>
    direction === 'column'
      ? css`
          width: 100%;
        `
      : css`
          height: 100%;
        `}
`;

/**
 * @description Block overlay with action buttons.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockActions(props: Props) {
  return (
    <Box>
      <Container alignItems={'center'} container justify={'space-between'}>
        <Item item>
          <BlockAddFab {...props} type={CREATE_LEFT_BLOCK} />
        </Item>
        <Item item>
          <BlockAddFab {...props} type={CREATE_RIGHT_BLOCK} />
        </Item>
      </Container>

      <Container
        alignItems={'center'}
        container
        direction={'column'}
        justify={'space-between'}
      >
        <Item container item direction={'column'}>
          <BlockAddFab {...props} type={CREATE_TOP_BLOCK} />
        </Item>
        <Item container item direction={'column'}>
          <BlockAddFab {...props} type={CREATE_BOTTOM_BLOCK} />
        </Item>
      </Container>
    </Box>
  );
}
