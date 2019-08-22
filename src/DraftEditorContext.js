// @flow
import { useEffect, useMemo, useState, createContext } from 'react';
import { ContentState, EditorState } from 'draft-js';

import { toDraftContent, toDraftEditor, toRawContent } from './Draft.helpers';
import type { ContentBlock } from './types';
import { UPDATE_BLOCK_DATA } from './reducers/content';
import type { Action } from './reducers/content';

export type DraftEditorState = {|
  id: string | null,
  editorState: EditorState | null,
  setEditorState: (EditorState | null) => any,
|};

export default createContext<DraftEditorState>({
  id: null,
  editorState: null,
  setEditorState: () => {},
});

const defaultBlock = { id: null, data: { body: null } };

/**
 * @description Use draft editor state of a block with dispatch for its updates.
 * @param {ContentBlock} block
 * @param {Function} dispatch
 * @returns {DraftEditorState}
 */
export function useDraftEditorState(
  { id, data: { body: rawContent } }: ContentBlock = defaultBlock,
  dispatch: (Action) => any
) {
  // inner state initialization
  const initialContentState = useMemo<ContentState | null>(
    () => rawContent && toDraftContent(rawContent),
    [rawContent]
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
        type: UPDATE_BLOCK_DATA,
        data: { body: toRawContent(contentState) },
      });
    }
  }, [contentState, dispatch, id]);

  return { id, editorState, setEditorState };
}
