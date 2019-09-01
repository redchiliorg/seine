// @flow
import 'muicss/dist/css/mui-noglobals.min.css';
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import type { Props } from '../../content/src/Content';
import Content, {
  defaultBlockRenderMap,
} from '../../content/src/Content';
import { blockTypes } from '../../core/src/types';
import DraftEditor from '../../draft-editor/src/DraftEditor';
import GridEditor from './GridEditor';
import Paper from '../../ui/src/Paper';
import PieEditor from '../../pie-editor/src/PieEditor';
import PieToolbar from '../../pie-editor/src/PieToolbar';
import DraftToolbar from '../../draft-editor/src/DraftToolbar';
import DraftEditorContext, {
  useDraftEditorState,
} from '../../draft-editor/src/DraftEditorContext';
import { useReducerEx } from '../../core/src/hooks';

import ContentToolbar from './ContentToolbar';
import reduce, { initialState } from '../../core/src/reducers/editor';
import type { Action, State } from '../../core/src/reducers/editor';

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
  const [{ blocks, selection }, dispatch] = useReducerEx<State, Action>(
    reduce,
    initialState,
    React.useCallback(() => ({ ...initialState, blocks: children }), [children])
  );

  React.useEffect(() => {
    onChange && onChange(blocks);
  }, [blocks, onChange]);

  const selectedBlock = React.useMemo(
    () =>
      selection.length === 1 && blocks.find(({ id }) => selection.includes(id)),
    [blocks, selection]
  );

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
            <ContentToolbar dispatch={dispatch} selection={selection} />
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
