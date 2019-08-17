// @flow
import * as React from 'react';
import styled from 'styled-components';

import type { Props } from './Content';
import Content, { defaultBlockRenderMap } from './Content';
import { blockTypes } from './types';
import DraftEditor from './DraftEditor';
import GridEditor from './GridEditor';
import ContentEditorToolbar from './ContentEditorToolbar';
import Paper from './Paper';
import reduce from './reducers/editor';
import { PieEditor } from './PieEditor';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  min-height: 25rem;
  position: relative;
`;

const ContentPaper = styled(Paper)`
  width: 100%;
  flex-grow: 1;
  :before {
    content: '';
    background-color: white;
    display: block;
    width: calc(100% + 40px);
    height: 25px;
    position: relative;
    margin-top: -25px;
    margin-left: -20px;
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
  ...contentProps
}: Props) {
  const [blocks, onChange] = React.useReducer(reduce, children);
  return (
    <Container>
      <ContentEditorToolbar
        onChange={onChange}
        hasSelected={blocks.some(({ selected }) => selected)}
      />
      <ContentPaper>
        <Content {...contentProps} blockRenderMap={blockRenderMap}>
          {blocks.map(({ id, data, selected, ...block }) => ({
            ...block,
            id,
            data: { ...data, id, selected, onChange },
          }))}
        </Content>
      </ContentPaper>
    </Container>
  );
}
