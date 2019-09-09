// @flow
import * as Editor from './editor';

export {
  default as editor,
  CREATE_BLOCK,
  DELETE_SELECTED_BLOCKS,
  SELECT_BLOCK,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_FORMAT,
  UPDATE_BLOCK_EDITOR,
  initialState,
} from './editor';

export type EditorState = Editor.State;
export type EditorAction = Editor.Action;

export type State = EditorState;
export type Action = EditorAction;
