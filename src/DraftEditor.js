// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Editor } from 'draft-js';

import { useBlockSelection } from './helpers';
import type { DraftData } from './types';
import DraftEditorContext from './DraftEditorContext';
import Draft from './Draft';

type Props = DraftData & {
  id: string,
  dispatch: Function,
};

const Container = styled.div`
  .DraftEditor-root {
    height: 100%;
  }
  .public-DraftEditor-content {
    display: grid;
    align-items: ${({ verticalAlignment = 'start' }) => verticalAlignment};
  }
  ${({ isSelected }) =>
    isSelected
      ? css`
          border: 1px dashed blue;
        `
      : css`
          border: 1px solid transparent;
        `}
  ${({ isSelected, hasSelected }) =>
    !isSelected &&
    hasSelected &&
    css`
      pointer-events: none;
    `}
`;

/**
 * @description Draft block editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function DraftEditor({
  id,
  dispatch,
  children,
  body,
  ...draftProps
}: Props) {
  const { editorState, setEditorState, ...selectedBlock } = React.useContext(
    DraftEditorContext
  );
  const isSelected = selectedBlock.id === id;

  return (
    <Container
      {...useBlockSelection(id, dispatch)}
      isSelected={isSelected}
      hasSelected={!!selectedBlock.id}
      verticalAlignment={draftProps.verticalAlignment}
    >
      {isSelected && !!editorState ? (
        <Editor
          {...draftProps}
          ref={(editor) => editor && editor.focus()}
          editorState={editorState}
          onChange={setEditorState}
        />
      ) : (
        <Draft {...draftProps}>{body}</Draft>
      )}
    </Container>
  );
}
