// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import type { BlockEditor, DraftBody, DraftFormat } from '@seine/core';
import {
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
  useSelectableBlockProps,
} from '@seine/core';
import { toDraftEditor, toRawContent } from '@seine/draft';
import { Editor } from 'draft-js';

type Props = (DraftBody & DraftFormat & BlockEditor) & {
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
  ${({ id, selection }: Props) =>
    selection.includes(id)
      ? css`
          border: 1px dashed blue;
        `
      : css`
          border: 1px solid transparent;
        `}
`;

export const defaultDraftEditor = {
  state: null,
};

/**
 * @description Draft block editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function DraftEditor({
  id,
  selection,
  dispatch,
  entityMap,
  blocks,
  textAlignment,
  verticalAlignment,
  editor: { state = defaultDraftEditor.state } = defaultDraftEditor,
  ...containerProps
}: Props) {
  const readOnly = selection.length !== 1 || selection[0] !== id;

  const editorRef = React.useRef<?Editor>(null);

  React.useEffect(() => {
    const { current } = editorRef;
    if (!readOnly && current && current.editor) {
      current.editor.focus();
    }
  }, [readOnly]);

  const editorState = React.useMemo(
    () => state || toDraftEditor({ blocks, entityMap }),
    // eslint-disable-next-line
    [id, state]
  );

  const contentState = editorState && editorState.getCurrentContent();
  React.useEffect(() => {
    if (!readOnly) {
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: toRawContent(contentState),
      });
    }
  }, [contentState, dispatch, readOnly]);

  return (
    <Container
      verticalAlignment={verticalAlignment}
      {...useSelectableBlockProps({ id, selection }, dispatch)}
      {...containerProps}
    >
      <Editor
        textAlignment={textAlignment}
        editorState={editorState}
        ref={editorRef}
        onChange={React.useCallback(
          (state) =>
            dispatch({
              type: UPDATE_BLOCK_EDITOR,
              editor: { state },
            }),
          [dispatch]
        )}
        readOnly={readOnly}
      />
    </Container>
  );
}
