// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import type { BlockEditor, RichTextBody, RichTextFormat } from '@seine/core';
import { UPDATE_BLOCK_BODY, UPDATE_BLOCK_EDITOR } from '@seine/core';
import { BlockActions } from '@seine/ui';
import { DraftStyle } from '@seine/draft';
import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js';

type Props = (RichTextBody & RichTextFormat & BlockEditor) & {
  id: string,
  dispatch: Function,
};

const Container = styled.div`
  position: relative;
  height: 100%;
  cursor: text;

  .DraftEditor-root {
    height: 100%;
  }
  .public-DraftEditor-content {
    display: grid;
    height: 100%;
    align-items: ${({ verticalAlignment = 'start' }) => verticalAlignment};
  }
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
  addButtonRenderMap,
  editor: { state = defaultDraftEditor.state } = defaultDraftEditor,
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
    () =>
      state ||
      EditorState.createWithContent(convertFromRaw({ blocks, entityMap })),
    // eslint-disable-next-line
    [id, state]
  );

  React.useEffect(() => {
    if (editorState && !readOnly) {
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: convertToRaw(editorState.getCurrentContent()),
      });
    }
  }, [dispatch, editorState, readOnly]);

  return (
    <>
      <DraftStyle />
      <Container verticalAlignment={verticalAlignment}>
        <Editor
          editorKey={id}
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
        <BlockActions
          addButtonRenderMap={addButtonRenderMap}
          dispatch={dispatch}
          extended
          id={id}
          selection={selection}
        />
      </Container>
    </>
  );
}
