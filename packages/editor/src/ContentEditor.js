// @flow
import 'muicss/dist/css/mui-noglobals.min.css';
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Content, Page } from '@seine/content';
import type { ContentProps } from '@seine/content';
import type { Block, EditorAction, EditorState } from '@seine/core';
import {
  blockTypes,
  DELETE_SELECTED_BLOCKS,
  reduceEditor,
  initialEditor,
  SELECT_BLOCK,
} from '@seine/core';
import { DraftEditor, DraftToolbar } from '@seine/draft-editor';
import { ActionButton, Paper, Toolbar, useReducerEx } from '@seine/ui';
import {
  PieChartEditor,
  PieChartToolbar,
  BarChartEditor,
  BarChartToolbar,
} from '@seine/charts-editor';

import GridEditor from './GridEditor';
import ContentToolbar from './ContentToolbar';

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

const ContentToolbarGroup = styled(Toolbar.Group)`
  margin-left: auto;
`;

const defaultEditorBlockRendererMap = {
  [blockTypes.DRAFT]: DraftEditor,
  [blockTypes.GRID]: GridEditor,
  [blockTypes.PAGE]: Page,
  [blockTypes.BAR_CHART]: BarChartEditor,
  [blockTypes.PIE_CHART]: PieChartEditor,
};

const defaultBlockToolbarRenderMap = {
  [blockTypes.DRAFT]: DraftToolbar,
  [blockTypes.GRID]: ContentToolbar,
  [blockTypes.PAGE]: ContentToolbar,
  [blockTypes.BAR_CHART]: BarChartToolbar,
  [blockTypes.PIE_CHART]: PieChartToolbar,
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
  theme?: { [string]: any },
  as?: React.ComponentType<*>,
} & ContentProps;

/**
 * @description Default content editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ContentEditor({
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
    () => ({ ...initialEditor, blocks: children }),
    [children]
  );
  const [{ blocks, selection }, dispatch] = useReducerEx<
    EditorState,
    EditorAction
  >(reduceEditor, initialEditor, init);

  React.useEffect(() => {
    onChange(
      // no extra data should be passed, like `editor` key value
      blocks.map(({ id, body, format }) => ({
        id,
        body,
        format,
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
          {selection.length > 0 && (
            <ContentToolbarGroup>
              <ActionButton
                color={'danger'}
                title={'Delete current selection'}
                dispatch={dispatch}
                type={DELETE_SELECTED_BLOCKS}
              >
                Delete
              </ActionButton>
              {selection.length === 1 && (
                <ActionButton
                  color={'primary'}
                  title={'Cancel current selection'}
                  dispatch={dispatch}
                  type={SELECT_BLOCK}
                  id={selection[0]}
                  modifier={'sub'}
                >
                  Deselect
                </ActionButton>
              )}
            </ContentToolbarGroup>
          )}
        </BlockToolbar>
        <ContentPaper>
          <Content
            {...contentProps}
            parent={parent}
            blockRenderMap={blockRenderMap}
          >
            {React.useMemo(
              () => blocks.map((block) => ({ ...block, selection, dispatch })),
              [blocks, dispatch, selection]
            )}
          </Content>
        </ContentPaper>
      </Container>
    </ThemeProvider>
  );
}
