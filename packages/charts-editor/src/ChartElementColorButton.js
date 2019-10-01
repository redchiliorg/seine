// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@seine/ui';
import { SketchPicker } from 'react-color';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultChartEditor, defaultChartFormat } from '@seine/charts';

const StyledColorButton = styled(Button)`
  &&& {
    ${({ color }) =>
      css`
        background-color: ${color};
      `}
  }
`;

const ColorPickerContainer = styled.div`
  margin-right: -250px;
  margin-top: 50px;
  position: absolute;
  z-index: 999;
  ${({ open }) =>
    !open &&
    css`
      display: none;
    `}
`;

// eslint-disable-next-line
export default function ChartElementColorButton({
  dispatch,
  editor: { selection = defaultChartEditor.selection } = defaultChartEditor,
  format: { palette = defaultChartFormat.palette } = defaultChartFormat,
}) {
  const [open, setOpen] = React.useState(false);
  const colorIndex = selection % palette.length;
  const color = palette[colorIndex];
  return (
    <>
      <StyledColorButton
        color={color}
        onClick={React.useCallback(() => setOpen(!open), [open])}
        size={'small'}
      />
      <ColorPickerContainer open={open}>
        <SketchPicker
          color={color}
          onChange={React.useCallback(
            ({ hex }) =>
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: {
                  palette: [
                    ...palette.slice(0, colorIndex),
                    hex,
                    ...palette.slice(colorIndex + 1),
                  ],
                },
              }),
            [colorIndex, dispatch, palette]
          )}
        />
      </ColorPickerContainer>
    </>
  );
}
