// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Content, defaultBlockRenderMap } from '@seine/content';
import type { ContentProps } from '@seine/content';
import type { Block, BlocksAction, BlocksState } from '@seine/core';
import {
  blockTypes,
  CREATE_BLOCK,
  DESELECT_ALL_BLOCKS,
  initialBlocksState,
  reduceBlocks,
} from '@seine/core';
import { DraftEditor, DraftToolbar } from '@seine/draft-editor';
import {
  BlockAddFab,
  BlockToolbarGroup,
  Paper,
  StylesProvider,
  useReducerEx,
} from '@seine/ui';
import { ChartEditor, ChartToolbar } from '@seine/charts-editor';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const defaultEditorChildren = [];

const DefaultContainer = styled.div`
  width: 75%;
`;

export const defaultEditorBlockRendererMap = {
  [blockTypes.CHART]: ChartEditor,
  [blockTypes.DRAFT]: DraftEditor,
  [blockTypes.GRID]: ({ dispatch, editor, selection, ...props }) =>
    defaultBlockRenderMap[blockTypes.GRID](props),
  [blockTypes.PAGE]: ({ dispatch, editor, selection, ...props }) =>
    defaultBlockRenderMap[blockTypes.PAGE](props),
};

export const defaultToolbarRenderMap = {
  [blockTypes.CHART]: ChartToolbar,
  [blockTypes.DRAFT]: DraftToolbar,
  [blockTypes.GRID]: () => null,
  [blockTypes.PAGE]: ({ blocks, dispatch, id }) =>
    blocks.length ? null : (
      <Box display={'flex'} justifyContent={'center'} width={'100%'}>
        <BlockAddFab dispatch={dispatch} id={id} type={CREATE_BLOCK} />
      </Box>
    ),
};

const ContentPaper = styled(Paper)`
  && {
    max-height: 40rem;
    min-height: 6rem;
    overflow: hidden auto;
  }
`;

export type Props = {
  parent: Block,
  onChange: (Block[]) => any,
  children?: Block[],
  as?: React.ComponentType<*>,
} & ContentProps;

/**
 * @description Default content editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Editor({
  parent,
  onChange,
  children = defaultEditorChildren,
  as: Container = DefaultContainer,
  blockRenderMap = defaultEditorBlockRendererMap,
  toolbarRenderMap = defaultToolbarRenderMap,
  ...contentProps
}: Props) {
  const init = React.useCallback(
    () => ({ ...initialBlocksState, blocks: children }),
    [children]
  );
  const [{ blocks, selection }, dispatch] = useReducerEx<
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
    () => blocks.map((block) => ({ ...block, dispatch, selection })),
    [blocks, dispatch, selection]
  );

  return (
    <StylesProvider>
      <ClickAwayListener
        onClickAway={React.useCallback(
          (event) =>
            !(
              event.target instanceof HTMLElement &&
              event.target.getAttribute('role') === 'option'
            ) && dispatch({ type: DESELECT_ALL_BLOCKS }),
          [dispatch]
        )}
      >
        <Container>
          <BlockToolbar
            {...block}
            blocks={blocks}
            dispatch={dispatch}
            selection={selection}
          >
            <BlockToolbarGroup dispatch={dispatch} selection={selection} />
          </BlockToolbar>

          {contentChildren.length > 0 && (
            <ContentPaper>
              <Content
                {...contentProps}
                parent={parent}
                blockRenderMap={blockRenderMap}
              >
                {contentChildren}
              </Content>
            </ContentPaper>
          )}
        </Container>
      </ClickAwayListener>
    </StylesProvider>
  );
}
