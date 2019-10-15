// @flow
import * as React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import MuiButton from '@material-ui/core/Button';
import MuiFab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import type { AddButtonProps, BlockType } from '@seine/core';
import { blockTypes } from '@seine/core';
import { Box } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
        <Fab
          ref={anchorEl}
          size={'small'}
          onClick={(event) => {
            setOpen(true);
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <AddIcon />
        </Fab>
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
