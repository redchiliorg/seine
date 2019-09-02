// @flow
import { createContext, useEffect, useMemo, useState } from 'react';
import { typeof ContentState, EditorState } from 'draft-js';
import {
  toDraftContent,
  toDraftEditor,
  toRawContent,
  defaultDraftBody,
} from '@seine/draft';
import type { Action, Block } from '@seine/core';
import { blockTypes, UPDATE_BLOCK_BODY } from '@seine/core';

export type DraftEditorState = {|
  id: string | null,
  editorState: EditorState | null,
  setEditorState: (EditorState | null) => any,
|};

export default createContext<DraftEditorState>({
  id: null,
  editorState: EditorState.createEmpty(),
  setEditorState: () => {},
});

/**
 * @description Use draft editor state of a block with dispatch for its updates.
 * @param {Block} block
 * @param {Function} dispatch
 * @returns {DraftEditorState}
 */
export function useDraftEditorState(
  { id = null, body = defaultDraftBody, type }: Block = {},
  dispatch: (Action) => any
) {
  // inner state initialization
  const initialContentState = useMemo<ContentState | null>(
    () => (type === blockTypes.DRAFT ? toDraftContent(body) : null),
    [body, type]
  );
  const initialEditorState = useMemo<EditorState | null>(
    () => initialContentState && toDraftEditor(initialContentState),
    [initialContentState]
  );
  const [editorState, setEditorState] = useState<*>(initialEditorState);

  // empty inner editor state indicates it should be reset to initial
  useEffect(() => {
    if (!editorState !== !initialEditorState) {
      setEditorState(initialEditorState);
    }
  }, [editorState, initialEditorState]);

  // dispatch any changed inner content state
  const contentState = editorState && editorState.getCurrentContent();
  useEffect(() => {
    if (id && contentState) {
      dispatch({
        id: id,
        type: UPDATE_BLOCK_BODY,
        body: toRawContent(contentState),
      });
    }
  }, [contentState, dispatch, id]);

  return { id, editorState, setEditorState };
}
