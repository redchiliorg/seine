// @flow
import type { BlockElement } from '../types';

export const PUSH_ELEMENT = '@seine/charts/pushElement';
export const UPDATE_ELEMENT = '@seine/charts/updateElement';
export const REMOVE_ELEMENT = '@seine/charts/removeElement';
export const UPDATE_ELEMENT_BY_ID = '@seine/charts/updateElementById';
export const UPDATE_ELEMENT_BY_GROUP = '@seine/charts/updateElementByGroup';

export const initialElements = [];

type PushBlockElementAction = {
  type: typeof PUSH_ELEMENT,
  body: $Shape<BlockElement>,
};
type UpdateBlockElementAction = {
  type: typeof UPDATE_ELEMENT,
  index: string,
  body: $Shape<BlockElement>,
};
type UpdateBlockElementByIdAction = {
  type: typeof UPDATE_ELEMENT,
  id: string,
  body: BlockElement,
};
type UpdateBlockElementByGroup = {
  type: typeof UPDATE_ELEMENT,
  group: string,
  body: BlockElement,
};
type RemoveBlockElementAction = {
  type: typeof REMOVE_ELEMENT,
  index: number,
};
export type ElementsState = $ReadOnlyArray<BlockElement>;
export type ElementsAction =
  | PushBlockElementAction
  | UpdateBlockElementAction
  | UpdateBlockElementByIdAction
  | UpdateBlockElementByGroup
  | RemoveBlockElementAction;

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
    case UPDATE_ELEMENT_BY_ID:
      return state.map((element) =>
        element.id === action.id ? { ...element, ...action.body } : element
      );
    case UPDATE_ELEMENT_BY_GROUP:
      return state.map((element) =>
        element.group === action.group
          ? { ...element, ...action.body }
          : element
      );
    case REMOVE_ELEMENT:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
}
