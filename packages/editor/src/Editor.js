// @flow
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import type { ContentProps } from '@seine/content';
import { Content } from '@seine/content';
import type { Block, BlocksAction, BlocksState } from '@seine/core';
import { blockTypes, initialBlocksState, reduceBlocks } from '@seine/core';
import { DraftEditor, DraftToolbar } from '@seine/draft-editor';
import { BlockToolbarGroup, Paper, useReducerEx } from '@seine/ui';
import { ChartEditor, ChartToolbar } from '@seine/charts-editor';

import GridEditor from './GridEditor';

const DefaultContainer = styled.div`
  width: 75%;
`;

const ContentPaper = styled(Paper)`
  max-height: 40rem;
  overflow: hidden auto;
  :after {
    content: '';
    display: inline-block;
    height: 1.5em;
  }
`;

const defaultEditorBlockRendererMap = {
  [blockTypes.DRAFT]: DraftEditor,
  [blockTypes.GRID]: GridEditor,
  [blockTypes.PAGE]: ({ children }) => children,
  [blockTypes.CHART]: ChartEditor,
};

const defaultBlockToolbarRenderMap = {
  [blockTypes.DRAFT]: DraftToolbar,
  [blockTypes.GRID]: () => null,
  [blockTypes.PAGE]: () => null,
  [blockTypes.CHART]: ChartToolbar,
};

const defaultEditorChildren = [];

const defaultEditorTheme = {
  palette: {
    text: '#C8C8C8',
  },
};

export type Props = {
  parent: Block,
  onChange: (Block[]) => any,
  children?: Block[],
  as?: React.ComponentType<*>,
  theme?: { [string]: any },
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
  toolbarRenderMap = defaultBlockToolbarRenderMap,
  theme = defaultEditorTheme,
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

  const currentBlock = React.useMemo(
    () =>
      selection.length === 1
        ? blocks.find(({ id }) => selection.includes(id))
        : parent,
    [blocks, parent, selection]
  );

  const BlockToolbar = toolbarRenderMap[currentBlock.type];

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <BlockToolbar
          {...currentBlock}
          blocks={blocks}
          dispatch={dispatch}
          selection={selection}
        >
          <BlockToolbarGroup dispatch={dispatch} selection={selection} />
        </BlockToolbar>

        <ContentPaper>
          <Content
            {...contentProps}
            parent={parent}
            blockRenderMap={blockRenderMap}
          >
            {React.useMemo(
              () => blocks.map((block) => ({ ...block, dispatch, selection })),
              [blocks, dispatch, selection]
            )}
          </Content>
        </ContentPaper>
      </Container>
    </ThemeProvider>
  );
}
