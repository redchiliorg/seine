// @flow
import 'muicss/dist/css/mui.css';
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import type { Props } from './Content';
import Content, { defaultBlockRenderMap } from './Content';
import { blockTypes } from './types';
import DraftEditor from './DraftEditor';
import GridEditor from './GridEditor';
import Paper from './ui/Paper';
import reduce from './reducers/content';
import PieEditor from './PieEditor';
import PieToolbar from './PieToolbar';
import ContentToolbar from './ContentToolbar';
import DraftToolbar from './DraftToolbar';
import DraftEditorContext, { useDraftEditorState } from './DraftEditorContext';

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
  const [blocks, dispatch] = React.useReducer(reduce, children);

  React.useEffect(() => {
    onChange && onChange(blocks);
  }, [blocks, onChange]);

  const selectedBlock = blocks.find(({ selected }) => selected);

  return (
    <ThemeProvider theme={theme}>
      <DraftEditorContext.Provider
        value={useDraftEditorState(selectedBlock, dispatch)}
      >
        <Container>
          {selectedBlock && selectedBlock.type === blockTypes.PIE ? (
            <PieToolbar {...selectedBlock} dispatch={dispatch} />
          ) : selectedBlock && selectedBlock.type === blockTypes.DRAFT ? (
            <DraftToolbar {...selectedBlock} dispatch={dispatch} />
          ) : (
            <ContentToolbar dispatch={dispatch} />
          )}
          <ContentPaper>
            <Content {...contentProps} blockRenderMap={blockRenderMap}>
              {blocks.map(({ id, body, selected, ...block }) => ({
                ...block,
                id,
                body: { ...(body || {}), id, selected, dispatch },
              }))}
            </Content>
          </ContentPaper>
        </Container>
      </DraftEditorContext.Provider>
    </ThemeProvider>
  );
}
