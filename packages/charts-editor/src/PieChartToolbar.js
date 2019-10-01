// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import { SketchPicker } from 'react-color';
import type { Action, Block, BlockId, ChartBody } from '@seine/core';
import {
  createBlockElement,
  initialElementsState,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';
import type { BlockToolbarGroup } from '@seine/ui';
import {
  ActionButton,
  Button,
  CompositeActionButton,
  Toolbar,
} from '@seine/ui';
import { defaultChartPalette } from '@seine/charts';

type Props = Block & {
  dispatch: (Action) => any,
  body: ChartBody,
  selection: BlockId[],
  children: React.Element<typeof BlockToolbarGroup>,
};

const defaultBody = { elements: [] };
const defaultEditor = { selection: initialElementsState.selection };
const defaultFormat = {
  palette: defaultChartPalette,
};

/**
 * @description Action buttons to edit currently selected bar chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartToolbar({
  body,
  children,
  dispatch,
  editor,
  format,
  id,
}: Props) {
  body = body || defaultBody;
  editor = editor || defaultEditor;
  format = format || defaultFormat;
  return (
    <Toolbar>
      <Toolbar.Group>
        <AddPieChartElementButton
          body={body}
          dispatch={dispatch}
          format={format}
          id={id}
        />
        {editor.selection > -1 && [
          <RemovePieChartElementButton
            key={'remove'}
            body={body}
            dispatch={dispatch}
            editor={editor}
            format={format}
            id={id}
          />,
          <PieColorButton
            body={body}
            dispatch={dispatch}
            editor={editor}
            format={format}
            id={id}
            key={'color'}
          />,
        ]}
      </Toolbar.Group>
      {children}
    </Toolbar>
  );
}

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
function PieColorButton({
  dispatch,
  editor: { selection },
  format: { palette = defaultFormat.palette },
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

// eslint-disable-next-line
function AddPieChartElementButton({ body, dispatch, id }) {
  return (
    <ActionButton
      id={id}
      title={'Add element'}
      dispatch={dispatch}
      type={UPDATE_BLOCK_BODY}
      body={React.useMemo(
        () => ({
          elements: [
            ...body.elements,
            createBlockElement({
              title: `Item #${body.elements.length + 1}`,
              value: 10,
            }),
          ],
        }),
        [body.elements]
      )}
    >
      Add slice
    </ActionButton>
  );
}

// eslint-disable-next-line
function RemovePieChartElementButton({ body, dispatch, editor, id }) {
  return (
    <CompositeActionButton
      title={'Remove element'}
      dispatch={dispatch}
      actions={React.useMemo(
        () => [
          {
            editor: { selection: -1 },
            id: id,
            type: UPDATE_BLOCK_EDITOR,
          },
          {
            body: {
              elements: [
                ...body.elements.slice(0, editor.selection),
                ...body.elements.slice(editor.selection + 1),
              ],
            },
            id: id,
            type: UPDATE_BLOCK_BODY,
          },
        ],
        [body.elements, editor.selection, id]
      )}
    >
      Remove slice
    </CompositeActionButton>
  );
}
