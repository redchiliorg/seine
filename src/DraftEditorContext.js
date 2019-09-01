// @flow
import { createContext, useEffect, useMemo, useState } from 'react';
import { ContentState, EditorState } from 'draft-js';

import { toDraftContent, toDraftEditor, toRawContent } from './Draft.helpers';
import type { Block } from './types';
import type { Action } from './reducers/content';
import { UPDATE_BLOCK_BODY } from './reducers/content';
import { defaultDraftBody } from './Draft';
import { blockTypes } from './types';

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
  const [editorState, setEditorState] = useState(initialEditorState);

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
