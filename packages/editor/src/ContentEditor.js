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

type Props = ContentProps & {
  onChange?: (Block[]) => any,
  theme?: { [string]: any },
  as?: React.ComponentType<*>,
};

/**
 * @description Default content editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ContentEditor({
  children,
  blockRenderMap = {
    ...defaultBlockRenderMap,
    [blockTypes.PIE]: PieEditor,
    [blockTypes.DRAFT]: DraftEditor,
    [blockTypes.GRID]: GridEditor,
  },
  theme = {
    palette: {
      text: '#C8C8C8',
    },
  },
  onChange,
  as: Container = DefaultContainer,
  ...contentProps
}: Props) {
  const [{ blocks, selection }, dispatch] = useReducerEx<
    EditorState,
    EditorAction
  >(
    reduce,
    initialState,
    React.useCallback(() => ({ ...initialState, blocks: children }), [children])
  );

  React.useEffect(() => {
    onChange && onChange(blocks);
  }, [blocks, onChange]);

  const toolbarProps = {
    ...React.useMemo(
      () =>
        selection.length === 1 &&
        blocks.find(({ id }) => selection.includes(id)),
      [blocks, selection]
    ),
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
            <Content {...contentProps} blockRenderMap={blockRenderMap}>
              {blocks.map((block) => ({ ...block, selection, dispatch }))}
            </Content>
          </ContentPaper>
        </Container>
      </DraftEditorContext.Provider>
    </ThemeProvider>
  );
}
