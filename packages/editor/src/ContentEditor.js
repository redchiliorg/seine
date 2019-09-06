// @flow
import 'muicss/dist/css/mui-noglobals.min.css';
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import type { ContentProps } from '@seine/content';
import { Content, defaultBlockRenderMap } from '@seine/content';
import {
  blockTypes,
  useReducerEx,
  editor as reduce,
  initialState,
} from '@seine/core';
import type { Block, EditorAction, EditorState } from '@seine/core';
import {
  DraftEditor,
  DraftToolbar,
  DraftEditorContext,
  useDraftEditorState,
} from '@seine/draft-editor';
import { Paper } from '@seine/ui';
import { PieEditor, PieToolbar } from '@seine/pie-editor';

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

const defaultEditorBlockRendererMap = {
  ...defaultBlockRenderMap,
  [blockTypes.PIE]: PieEditor,
  [blockTypes.DRAFT]: DraftEditor,
  [blockTypes.GRID]: GridEditor,
};

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
  children = [],
  as: Container = DefaultContainer,
  blockRenderMap = defaultEditorBlockRendererMap,
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
    onChange(blocks);
  }, [blocks, onChange]);

  const toolbarProps = {
    ...(React.useMemo(
      () =>
        selection.length === 1 &&
        blocks.find(({ id }) => selection.includes(id)),
      [blocks, selection]
    ) || parent),
    dispatch,
    selection,
  };

  return (
    <ThemeProvider theme={theme}>
      <DraftEditorContext.Provider value={useDraftEditorState(toolbarProps)}>
        <Container>
          {toolbarProps.type === blockTypes.PIE ? (
            <PieToolbar {...toolbarProps} />
          ) : toolbarProps.type === blockTypes.DRAFT ? (
            <DraftToolbar {...toolbarProps} />
          ) : (
            <ContentToolbar {...toolbarProps} />
          )}
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
      </DraftEditorContext.Provider>
    </ThemeProvider>
  );
}
