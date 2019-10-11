// @flow
import * as React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import MuiFab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import type { AddButtonProps, BlockType } from '@seine/core';
import { blockTypes } from '@seine/core';

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
  ...addButtonProps
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
      <Fab
        size={'small'}
        onClick={React.useCallback((event) => {
          event.stopPropagation();
          setAnchorEl(event.currentTarget);
        }, [])}
      >
        <AddIcon />
      </Fab>

      <Menu
        anchorEl={anchorEl}
        onClose={React.useCallback((event) => {
          event.stopPropagation();
          setAnchorEl(null);
        }, [])}
        open={!!anchorEl}
      >
        {Object.values(blockTypes).map((blockType) => {
          const BlockAddButton = addButtonRenderMap[blockType];
          return (
            <BlockAddButton
              {...addButtonProps}
              fullWidth
              key={blockType}
              variant={'text'}
            />
          );
        })}
      </Menu>
    </>
  );
}
