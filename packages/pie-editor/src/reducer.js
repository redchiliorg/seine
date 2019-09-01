// @flow
import type { PieElement } from '../../core/src/types';

export const PUSH_PIE_ELEMENT = 'seine/pie/pushElement';
export const UPDATE_PIE_ELEMENT = 'seine/pie/updateElement';
export const REMOVE_PIE_ELEMENT = 'seine/pie/removeElement';

export const initialState = [];

type PushPieElementAction = {
  type: typeof PUSH_PIE_ELEMENT,
  body: PieElement,
};
type UpdatePieElementAction = {
  type: typeof UPDATE_PIE_ELEMENT,
  index: number,
  body: PieElement,
};
type RemovePieElementAction = {
  type: typeof REMOVE_PIE_ELEMENT,
  index: number,
};
export type State = $ReadOnlyArray<PieElement>;
export type Action =
  | PushPieElementAction
  | UpdatePieElementAction
  | RemovePieElementAction;

/**
 * @description Reduce pie editor actions.
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export default function reduce(state: State = initialState, action: Action) {
  switch (action.type) {
    case PUSH_PIE_ELEMENT:
      return [...state, action.body];
    case UPDATE_PIE_ELEMENT:
      return [
        ...state.slice(0, action.index),
        { ...state[action.index], ...action.body },
        ...state.slice(action.index + 1),
      ];
    case REMOVE_PIE_ELEMENT:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
}
