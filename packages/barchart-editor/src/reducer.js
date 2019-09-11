// @flow
import type { BarchartElement } from '@seine/core';

export const PUSH_BAR_CHART_ELEMENT = 'seine/barchart/pushElement';
export const UPDATE_BAR_CHART_ELEMENT = 'seine/barchart/updateElement';
export const REMOVE_BAR_CHART_ELEMENT = 'seine/barchart/removeElement';

export const initialState = [];

type PushBarchartElementAction = {
  type: typeof PUSH_BAR_CHART_ELEMENT,
  body: BarchartElement,
};
type UpdateBarchartElementAction = {
  type: typeof UPDATE_BAR_CHART_ELEMENT,
  index: number,
  body: BarchartElement,
};
type RemoveBarchartElementAction = {
  type: typeof REMOVE_BAR_CHART_ELEMENT,
  index: number,
};
export type State = $ReadOnlyArray<BarchartElement>;
export type Action =
  | PushBarchartElementAction
  | UpdateBarchartElementAction
  | RemoveBarchartElementAction;

/**
 * @description Reduce bar chart editor actions.
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export default function reduce(state: State = initialState, action: Action) {
  switch (action.type) {
    case PUSH_BAR_CHART_ELEMENT:
      return [...state, action.body];
    case UPDATE_BAR_CHART_ELEMENT:
      return [
        ...state.slice(0, action.index),
        { ...state[action.index], ...action.body },
        ...state.slice(action.index + 1),
      ];
    case REMOVE_BAR_CHART_ELEMENT:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
}
