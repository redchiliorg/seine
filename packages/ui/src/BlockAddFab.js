// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import MuiButton from '@material-ui/core/Button';
import MuiFab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import type { AddButtonProps, BlockType } from '@seine/core';
import {
  blockTypes,
  CREATE_BOTTOM_BLOCK,
  CREATE_LEFT_BLOCK,
  CREATE_RIGHT_BLOCK,
  CREATE_TOP_BLOCK,
} from '@seine/core';
import { Box } from '@material-ui/core';

const Button = styled(MuiButton)`
  && {
    border-radius: 0;
  }
`;

const Fab = styled(MuiFab)`
  && {
    opacity: 0.5;
    :hover {
      opacity: inherit;
    }
  }
`;

const MenuList = styled(Paper)`
  ${({ open, theme, type }) =>
    css`
      && {
        opacity: ${open ? 1 : 0};
        transition: opacity 0.25s, visibility 0s 0.25s;
        overflow: hidden;
        ${(type === CREATE_LEFT_BLOCK || type === CREATE_RIGHT_BLOCK) &&
          css`
            margin-top: -${theme.spacing(2.5 - 1.5) * 10}px;
          `};
        ${(type === CREATE_TOP_BLOCK || type === CREATE_BOTTOM_BLOCK) &&
          css`
            margin-left: -${theme.spacing(2.5 - 1.5) * 10}px;
          `};
        ${type === CREATE_RIGHT_BLOCK &&
          css`
            right: 0;
          `};

        ${type === CREATE_LEFT_BLOCK &&
          css`
            left: 0;
          `};
        ${type === CREATE_TOP_BLOCK &&
          css`
            top: 0;
          `};

        ${type === CREATE_BOTTOM_BLOCK &&
          css`
            bottom: 0;
          `};
        position: absolute;
        visibility: ${open ? 'visible' : 'hidden'};
        width: ${theme.spacing(2.5) * 10}px;
      }
    `}
`;

export type Props = AddButtonProps & {
  addButtonRenderMap: {
    [BlockType]: React.ComponentType<AddButtonProps>,
  },
};

/**
 * @description Fab of the actions to add a block relative to the current one.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockAddFab({
  addButtonRenderMap,
  type,
  ...addButtonProps
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleClose = React.useCallback(() => setOpen(false), []);

  return (
    <Box onMouseLeave={handleClose} position={'relative'}>
      <Fab
        size={'small'}
        onClick={React.useCallback(
          (event) => {
            event.stopPropagation();
            setOpen(!open);
          },
          [open]
        )}
      >
        <AddIcon />
      </Fab>
      <MenuList open={open} square type={type}>
        {React.useMemo(
          () =>
            Object.values(blockTypes).map((blockType) => {
              const BlockAddButton = addButtonRenderMap[blockType];
              return (
                <BlockAddButton
                  {...addButtonProps}
                  as={Button}
                  fullWidth
                  key={blockType}
                  type={type}
                  variant={'text'}
                />
              );
            }),
          [addButtonProps, addButtonRenderMap, type]
        )}
      </MenuList>
    </Box>
  );
}
