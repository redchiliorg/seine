// @flow
import * as React from 'react';
import type { ImageBody, ImageFormat, ToolbarProps } from '@seine/core';
import { BlockAddFab, Toolbar } from '@seine/ui';
import Box from '@material-ui/core/Box';
import { CREATE_BLOCK } from '@seine/core';

type Props = ToolbarProps & {
  body: ImageBody,
  format: ImageFormat,
};

/**
 * @description Action buttons to edit currently selected bar chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PageToolbar({
  id,
  addButtonRenderMap,
  blocks,
  dispatch,
}: Props) {
  return (
    <Toolbar>
      {!blocks.length && (
        <Box width={'100%'} display={'flex'} justifyContent={'center'}>
          <BlockAddFab
            addButtonRenderMap={addButtonRenderMap}
            dispatch={dispatch}
            id={id}
            type={CREATE_BLOCK}
          />
        </Box>
      )}
    </Toolbar>
  );
}
