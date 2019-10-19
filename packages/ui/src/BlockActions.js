// @flow
import * as React from 'react';
import {
  CREATE_BOTTOM_BLOCK,
  CREATE_LEFT_BLOCK,
  CREATE_RIGHT_BLOCK,
  CREATE_TOP_BLOCK,
  SELECT_BLOCK,
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
    & > * > * {
      pointer-events: all;
      opacity: 0;
    }
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
            }
            &:hover > * > * {
              opacity: 1;
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
  addButtonRenderMap,
  dispatch,
  extended,
  id,
  selection,
  ...containerProps
}: Props) {
  return (
    <Container
      {...containerProps}
      isSelected={selection.includes(id)}
      onClick={React.useCallback(
        (event: SyntheticMouseEvent<>) => {
          event.stopPropagation();
          dispatch({
            type: SELECT_BLOCK,
            id,
            ...(event.shiftKey ? { modifier: 'add' } : {}),
          });
        },
        [dispatch, id]
      )}
    >
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
