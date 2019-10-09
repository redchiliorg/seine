// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@seine/ui';
import { SketchPicker } from 'react-color';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import {
  chartPaletteKeyValues,
  defaultChartEditor,
  defaultChartFormat,
  defaultChartPaletteKey,
} from '@seine/charts';

const StyledColorButton = styled(Button).attrs(({ children = '' }) => ({
  children,
}))`
  &&& {
    background-color: ${({ bgcolor }) => bgcolor};
  ${({ theme }) =>
    css`
      height: ${theme.spacing(4)}px;
    `}
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
  format: {
    palette = defaultChartFormat.palette,
    paletteKey = defaultChartPaletteKey,
  } = defaultChartFormat,
}) {
  const [open, setOpen] = React.useState(false);
  const colorIndex = selection % palette.length;
  const color = palette[colorIndex];
  return (
    <>
      <StyledColorButton
        bgcolor={color}
        onClick={React.useCallback(() => setOpen(!open), [open])}
        size={'small'}
      />
      <ColorPickerContainer open={open}>
        <SketchPicker
          color={color}
          presetColors={chartPaletteKeyValues[paletteKey]}
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
