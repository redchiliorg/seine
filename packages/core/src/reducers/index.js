// @flow
import type { EditorAction, EditorState } from './reduceEditor';
import type { ElementsAction, ElementsState } from './reduceElements';

export type State = EditorState | ElementsState;
export type Action = EditorAction | ElementsAction;

export * from './reduceEditor';
export * from './reduceElements';
