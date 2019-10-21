// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { ClickAwayListener, Paper } from '@material-ui/core';
import type { ContentProps } from '@seine/content';
import { Content, defaultBlockRenderMap, Grid, Page } from '@seine/content';
import type {
  AddButtonProps,
  Block,
  BlockEditor,
  BlocksAction,
  BlocksState,
  BlockType,
  ToolbarProps,
} from '@seine/core';
import {
  blockTypes,
  DESELECT_ALL_BLOCKS,
  initialBlocksState,
  reduceBlocks,
} from '@seine/core';
import { ChartEditor, ChartToolbar } from '@seine/charts-editor';
import { DraftEditor, DraftToolbar } from '@seine/draft-editor';
import { BlockDeleteButton, StylesProvider, useReducerEx } from '@seine/ui';

import PieChartAddButton from './PieChartAddButton';
import BarChartAddButton from './BarChartAddButton';
import ColumnChartAddButton from './ColumnChartAddButton';
import LineChartAddButton from './LineChartAddButton';
import DraftAddButton from './DraftAddButton';
import { ImageEditor } from './ImageEditor';
import ImageToolbar from './ImageToolbar';
import PageToolbar from './PageToolbar';
import ImageAddButton from './ImageAddButton';

const defaultEditorChildren = [];

export const defaultEditorBlockRendererMap = {
  ...defaultBlockRenderMap,
  [blockTypes.CHART]: ChartEditor,
  [blockTypes.DRAFT]: DraftEditor,
  [blockTypes.GRID]: ({ dispatch, editor, selection, ...props }) => (
    <Grid {...props} />
  ),
  [blockTypes.PAGE]: ({
    id,
    addButtonRenderMap,
    dispatch,
    editor,
    selection,
    ...props
  }: BlockEditor & Block) => <Page {...props} />,
  [blockTypes.IMAGE]: ImageEditor,
};

export const defaultAddButtonRenderMap = {
  [blockTypes.CHART]: (props: AddButtonProps) => (
    <>
      <PieChartAddButton {...props} />
      <BarChartAddButton {...props} />
      <ColumnChartAddButton {...props} />
      <LineChartAddButton {...props} />
    </>
  ),
  [blockTypes.DRAFT]: DraftAddButton,
  [blockTypes.GRID]: () => null,
  [blockTypes.IMAGE]: ImageAddButton,
  [blockTypes.PAGE]: () => null,
};

export const defaultToolbarRenderMap = {
  [blockTypes.CHART]: ChartToolbar,
  [blockTypes.DRAFT]: DraftToolbar,
  [blockTypes.GRID]: PageToolbar,
  [blockTypes.IMAGE]: ImageToolbar,
  [blockTypes.PAGE]: PageToolbar,
};

const DefaultContainer = styled.div`
  width: 100%;
`;

const ContentPaper = styled(Paper)`
  && {
    ${({ theme }) => css`
      max-height: ${10 * theme.spacing(6)}px;
      min-height: ${2 * theme.spacing(6)}px;
      padding-bottom: ${theme.spacing(6)}px;
      padding-top: ${theme.spacing(6)}px;
      overflow: hidden auto;
    `}
  }
`;

export type Props = {
  as?: React.ComponentType<*>,
  children?: Block[],
  onChange: (Block[]) => any,
  parent: Block,
  addButtonRenderMap?: {
    [BlockType]: React.ComponentType<AddButtonProps>,
  },
  toolbarRenderMap?: {
    [BlockType]: React.ComponentType<ToolbarProps>,
  },
} & ContentProps;

/**
 * @description Default content editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Editor({
  addButtonRenderMap = defaultAddButtonRenderMap,
  as: Container = DefaultContainer,
  blockRenderMap = defaultEditorBlockRendererMap,
  children = defaultEditorChildren,
  onChange,
  parent,
  toolbarRenderMap = defaultToolbarRenderMap,
  ...contentProps
}: Props) {
  const init = React.useCallback(
    () => ({ ...initialBlocksState, blocks: children }),
    [children]
  );
  const [{ blocks, mode, selection }, dispatch] = useReducerEx<
    BlocksState,
    BlocksAction
  >(reduceBlocks, initialBlocksState, init);

  React.useEffect(() => {
    onChange(
      // no extra data should be passed, like `editor` key value
      blocks.map(({ id, body, format, parent_id, type }) => ({
        body,
        format,
        id,
        parent_id,
        type,
      }))
    );
  }, [blocks, onChange]);

  const { type, ...block } = React.useMemo(
    () =>
      selection.length === 1
        ? blocks.find(({ id }) => selection.includes(id))
        : parent,
    [blocks, parent, selection]
  );

  const BlockToolbar = toolbarRenderMap[type];

  const contentChildren = React.useMemo(
    () =>
      blocks.map((block) => ({
        ...block,
        addButtonRenderMap,
        dispatch,
        mode,
        selection,
      })),
    [addButtonRenderMap, blocks, dispatch, mode, selection]
  );

  return (
    <StylesProvider>
      <Container>
        <BlockToolbar
          {...block}
          blocks={blocks}
          addButtonRenderMap={addButtonRenderMap}
          dispatch={dispatch}
          selection={selection}
          mode={mode}
        >
          <BlockDeleteButton
            dispatch={dispatch}
            selection={selection}
            model={mode}
          />
        </BlockToolbar>
        {contentChildren.length > 0 && (
          <ClickAwayListener
            onClickAway={() =>
              mode !== 'fullscreen' &&
              dispatch({
                type: DESELECT_ALL_BLOCKS,
              })
            }
          >
            <ContentPaper>
              <Content
                {...contentProps}
                parent={parent}
                blockRenderMap={blockRenderMap}
              >
                {contentChildren}
              </Content>
            </ContentPaper>
          </ClickAwayListener>
        )}
      </Container>
    </StylesProvider>
  );
}
