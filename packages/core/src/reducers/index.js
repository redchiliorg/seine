// @flow
import * as Editor from './reduceEditor';

export {
  default as reduceEditor,
  CREATE_BLOCK,
  DELETE_SELECTED_BLOCKS,
  SELECT_BLOCK,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_FORMAT,
  UPDATE_BLOCK_EDITOR,
  initialEditor,
} from './reduceEditor';

export {
  default as reduceElements,
  PUSH_ELEMENT,
  UPDATE_ELEMENT,
  initialElements,
} from './reduceElements';

export type EditorState = Editor.State;
export type EditorAction = Editor.Action;

export type State = EditorState;
export type Action = EditorAction;
