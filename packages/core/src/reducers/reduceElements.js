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
export type ElementsState = ChartElement[];
export type ElementsAction =
  | PushChartElementAction
  | UpdateChartElementAction
  | RemoveChartElementAction;

/**
 * @description Reduce block elements actions.
 * @param {ElementsState} state
 * @param {ElementsAction} action
 * @returns {ElementsState}
 */
export function reduceElements(
  state: ElementsState = initialElements,
  action: ElementsAction
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
