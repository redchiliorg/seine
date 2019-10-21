// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import AddIcon from '@material-ui/icons/Add';
import {
  Button,
  Fab as MuiFab,
  Popover,
  Box,
  ClickAwayListener,
} from '@material-ui/core';
import type { AddButtonProps, BlockType } from '@seine/core';
import { blockTypes } from '@seine/core';

export const BlockFab = styled(MuiFab)`
  && {
    opacity: 0.5;
    :hover {
      opacity: inherit;
    }
  }
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
  const handleClose = React.useCallback((event) => {
    event.stopPropagation();
    setOpen(false);
  }, []);

  const anchorEl = React.useRef(null);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box position={'relative'}>
        <BlockFab
          ref={anchorEl}
          size={'small'}
          onClick={(event) => {
            setOpen(true);
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <AddIcon />
        </BlockFab>
        <Popover
          anchorEl={anchorEl.current}
          open={open}
          transitionDuration={0}
          keepMounted
        >
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
        </Popover>
      </Box>
    </ClickAwayListener>
  );
}
