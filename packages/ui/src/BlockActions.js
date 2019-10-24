// @flow
import * as React from 'react';
import {
  CREATE_BOTTOM_BLOCK,
  CREATE_LEFT_BLOCK,
  CREATE_RIGHT_BLOCK,
  CREATE_TOP_BLOCK,
  SELECT_BLOCK,
} from '@seine/core';
import { Box, Grid } from '@material-ui/core';
import styled, { css } from 'styled-components/macro';

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
              pointer-events: all;
            }
          `}
  }
`;

export const BlockActionsGroup = styled(Grid)`
  && {
    opacity: 0.25;
    &:hover {
      opacity: 1;
    }
    transition: all 0.1s;
    ${({ extended, theme }) => css`
      height: calc(100% + ${extended ? 2 * theme.spacing(5) : 0}px);
      left: 0;
      position: absolute;
      top: -${extended ? theme.spacing(5) : 0}px;
    `}
  }
`;

export const BlockActionsItem = styled(Grid)`
  && {
    align-items: center;
    display: flex;
    transition: opacity 0.1s;
    ${({ direction }) => css`
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

type Props = (FabProps & typeof ClientRect) & {
  children?: React.Node,
  extended?: boolean,
};

/**
 * @description Block overlay with action buttons.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockActions({
  addButtonRenderMap,
  children,
  dispatch,
  editor,
  extended,
  id,
  notSelectable = false,
  selection,
  ...containerProps
}: Props) {
  const containerRef = React.useRef(null);
  return (
    <Container
      {...containerProps}
      ref={containerRef}
      isSelected={!notSelectable && selection.includes(id)}
      onClick={React.useCallback(
        (event: SyntheticMouseEvent<>) => {
          if (
            !notSelectable &&
            !(
              !(event.target instanceof HTMLDivElement) &&
              containerRef.current &&
              containerRef.current.contains(event.target)
            )
          ) {
            event.stopPropagation();
            dispatch({
              type: SELECT_BLOCK,
              id,
              ...(event.shiftKey ? { modifier: 'add' } : {}),
            });
          }
        },
        [dispatch, id, notSelectable]
      )}
    >
      {children}
      <BlockActionsGroup
        alignItems={'center'}
        container
        extended={extended}
        justify={'space-between'}
      >
        <BlockActionsItem item>
          <BlockAddFab
            addButtonRenderMap={addButtonRenderMap}
            dispatch={dispatch}
            id={id}
            title={'Add block before...'}
            type={CREATE_LEFT_BLOCK}
          />
        </BlockActionsItem>
        <BlockActionsItem item>
          <BlockAddFab
            addButtonRenderMap={addButtonRenderMap}
            dispatch={dispatch}
            id={id}
            title={'Add block after...'}
            type={CREATE_RIGHT_BLOCK}
          />
        </BlockActionsItem>
      </BlockActionsGroup>

      <BlockActionsGroup
        alignItems={'center'}
        container
        direction={'column'}
        extended={extended}
        justify={'space-between'}
      >
        <BlockActionsItem container item direction={'column'}>
          <BlockAddFab
            addButtonRenderMap={addButtonRenderMap}
            dispatch={dispatch}
            id={id}
            title={'Add row before...'}
            type={CREATE_TOP_BLOCK}
          />
        </BlockActionsItem>
        <BlockActionsItem container item direction={'column'}>
          <BlockAddFab
            addButtonRenderMap={addButtonRenderMap}
            dispatch={dispatch}
            id={id}
            title={'Add row after...'}
            type={CREATE_BOTTOM_BLOCK}
          />
        </BlockActionsItem>
      </BlockActionsGroup>
    </Container>
  );
}
