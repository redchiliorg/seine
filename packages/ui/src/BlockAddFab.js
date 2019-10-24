// @flow
import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Button, Popover, Box, ClickAwayListener } from '@material-ui/core';
import type { AddButtonProps, BlockType } from '@seine/core';
import { blockTypes } from '@seine/core';

import Fab from './Fab';

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
  id,
  dispatch,
  type,
  ...fabProps
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
          size={'small'}
          {...fabProps}
          onClick={(event) => {
            setOpen(true);
            event.stopPropagation();
            event.preventDefault();
          }}
          ref={anchorEl}
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
                    as={Button}
                    dispatch={dispatch}
                    id={id}
                    fullWidth
                    key={blockType}
                    type={type}
                    variant={'text'}
                  />
                );
              }),
            [addButtonRenderMap, dispatch, id, type]
          )}
        </Popover>
      </Box>
    </ClickAwayListener>
  );
}
