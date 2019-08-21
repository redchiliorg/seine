// @flow
import * as React from 'react';
import styled from 'styled-components';

import type { Props } from './Content';
import Content, { defaultBlockRenderMap } from './Content';
import { blockTypes } from './types';
import DraftEditor from './DraftEditor';
import GridEditor from './GridEditor';
import Toolbar from './ui/Toolbar';
import Paper from './ui/Paper';
import reduce, { DELETE_SELECTED } from './reducers/content';
import PieEditor from './PieEditor';
import PieActions from './PieActions';
import ContentActions from './ContentActions';

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
  max-height: 40rem;
  overflow: hidden auto;
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
  :after {
    content: '';
    display: block;
    width: calc(100% + 40px);
    height: 20px;
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
  const [blocks, dispatch] = React.useReducer(reduce, children);
  const selectedBlock = blocks.find(({ selected }) => selected);

  return (
    <Container>
      <Toolbar>
        <ContentActions dispatch={dispatch} />
        {!!selectedBlock && (
          <Toolbar.Group>
            <Toolbar.Label>Selected block</Toolbar.Label>
            {selectedBlock.type === blockTypes.PIE && (
              <PieActions {...selectedBlock} dispatch={dispatch} />
            )}
            <Toolbar.ActionButton
              color={'danger'}
              title={'Delete current selection'}
              dispatch={dispatch}
              action={{ type: DELETE_SELECTED }}
            >
              Delete
            </Toolbar.ActionButton>
          </Toolbar.Group>
        )}
      </Toolbar>

      <ContentPaper>
        <Content {...contentProps} blockRenderMap={blockRenderMap}>
          {blocks.map(({ id, data, selected, ...block }) => ({
            ...block,
            id,
            data: { ...data, id, selected, dispatch },
          }))}
        </Content>
      </ContentPaper>
    </Container>
  );
}
