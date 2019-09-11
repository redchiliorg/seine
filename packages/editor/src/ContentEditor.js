// @flow
import 'muicss/dist/css/mui-noglobals.min.css';
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import type { ContentProps } from '@seine/content';
import { Content, defaultBlockRenderMap } from '@seine/content';
import type { Block, EditorAction, EditorState } from '@seine/core';
import {
  blockTypes,
  DELETE_SELECTED_BLOCKS,
  editor as reduce,
  initialState,
  SELECT_BLOCK,
  useReducerEx,
} from '@seine/core';
import { DraftEditor, DraftToolbar } from '@seine/draft-editor';
import { ActionButton, Paper, Toolbar } from '@seine/ui';
import { PieEditor, PieToolbar } from '@seine/pie-editor';
import { BarchartEditor, BarchartToolbar } from '@seine/barchart-editor';

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
  ...defaultBlockRenderMap,
  [blockTypes.PIE]: PieEditor,
  [blockTypes.DRAFT]: DraftEditor,
  [blockTypes.GRID]: GridEditor,
  [blockTypes.BARCHART]: BarchartEditor,
};

const defaultBlockToolbarRenderMap = {
  [blockTypes.PIE]: PieToolbar,
  [blockTypes.DRAFT]: DraftToolbar,
  [blockTypes.GRID]: ContentToolbar,
  [blockTypes.PAGE]: ContentToolbar,
  [blockTypes.BARCHART]: BarchartToolbar,
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
    () => ({ ...initialState, blocks: children }),
    [children]
  );
  const [{ blocks, selection }, dispatch] = useReducerEx<
    EditorState,
    EditorAction
  >(reduce, initialState, init);

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
            {blocks.map((block) => ({ ...block, selection, dispatch }))}
          </Content>
        </ContentPaper>
      </Container>
    </ThemeProvider>
  );
}
