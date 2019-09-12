// @flow
import type { ChartElement } from '../types';

export const PUSH_ELEMENT = '@seine/charts/pushElement';
export const UPDATE_ELEMENT = '@seine/charts/updateElement';
export const REMOVE_ELEMENT = '@seine/charts/removeElement';

export const initialElements = [];

type PushChartElementAction = {
  type: typeof PUSH_ELEMENT,
  body: ChartElement,
};
type UpdateChartElementAction = {
  type: typeof UPDATE_ELEMENT,
  index: number,
  body: ChartElement,
};
type RemoveChartElementAction = {
  type: typeof REMOVE_ELEMENT,
  index: number,
};
export type State = $ReadOnlyArray<ChartElement>;
export type Action =
  | PushChartElementAction
  | UpdateChartElementAction
  | RemoveChartElementAction;

/**
 * @description Reduce chart editor block elements.
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export default function reduceElements(
  state: State = initialElements,
  action: Action
) {
  switch (action.type) {
    case PUSH_ELEMENT:
      return [...state, action.body];
    case UPDATE_ELEMENT:
      return [
        ...state.slice(0, action.index),
        { ...state[action.index], ...action.body },
        ...state.slice(action.index + 1),
      ];
    case REMOVE_ELEMENT:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
}
