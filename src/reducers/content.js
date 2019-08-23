// @flow
import uuid from 'uuid/v1';

import type { ContentBlock, BlockBody } from '../types';

export const CREATE_BLOCK = 'seine/editor/createBlock';
export const CREATE_BLOCKS_TREE = 'seine/editor/createBlocksTree';
export const DELETE_SELECTED = 'seine/editor/deleteSelected';
export const SELECT_BLOCK = 'seine/editor/selectBlock';
export const DESELECT_BLOCK = 'seine/editor/deselectBlock';
export const UPDATE_BLOCK_BODY = 'seine/editor/updateBlockBody';

export const initialState = [];

export type BlocksTree = BlockBody & {
  children: BlocksTree[],
};
type CreateBlockAction = {
  type: typeof CREATE_BLOCK,
  block: ContentBlock,
};
type CreateBlocksTreeAction = {
  type: typeof CREATE_BLOCKS_TREE,
  children: BlocksTree,
};
type DeleteSelectedBlockAction = {
  type: typeof DELETE_SELECTED,
  id: string,
};
type SelectBlockAction = {
  type: typeof SELECT_BLOCK,
  id: string,
};
type DeselectBlockAction = {
  type: typeof DESELECT_BLOCK,
  id: string,
};
type UpdateBlockDataAction = {
  type: typeof UPDATE_BLOCK_BODY,
  id: string,
  body: BlockBody,
};
export type State = $ReadOnlyArray<ContentBlock>;
export type Action =
  | CreateBlockAction
  | CreateBlocksTreeAction
  | DeleteSelectedBlockAction
  | SelectBlockAction
  | DeselectBlockAction
  | UpdateBlockDataAction;

/**
 * @description Create a block of the parent.
 * @param {BlockBody} block
 * @param {string} parent_id
 * @returns {ContentBlock}
 */
function createBlock(block, parent_id = null) {
  return { ...block, id: uuid(), parent_id };
}

/**
 * @description Create blocks from tree.
 * @param {BlocksTree[]} children
 * @param {string} parent_id
 * @returns {ContentBlock[]}
 */
function createBlocksTree(children: BlocksTree[], parent_id = null) {
  return children.reduce((acc, { children, ...block }) => {
    block = createBlock(block, parent_id);
    return [
      ...acc,
      block,
      ...(children ? createBlocksTree(children, block.id) : []),
    ];
  }, []);
}

/**
 * @description Set `selected` of a block found by `id` in `state`.
 * @param {number} id
 * @param {boolean} selected
 * @param {State} state
 * @returns {State}
 */
function setBlockSelected(id, selected, state) {
  const index = state.findIndex(
    (block) => block.id === id && block.selected !== selected
  );
  if (index === -1) {
    return state;
  }
  return [
    ...state.slice(0, index),
    { ...state[index], selected },
    ...state.slice(index + 1),
  ];
}

/**
 * @description Reduce Content editor actions
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export default function reduce(state: State = initialState, action: Action) {
  switch (action.type) {
    case SELECT_BLOCK:
      return setBlockSelected(action.id, true, state);
    case DESELECT_BLOCK:
      return setBlockSelected(action.id, false, state);
    case CREATE_BLOCK:
      return [...state, createBlock(action.block)];
    case CREATE_BLOCKS_TREE: {
      const blocks = createBlocksTree(action.children);
      if (blocks.length) {
        return [...state, ...blocks];
      }
      return state;
    }
    case DELETE_SELECTED:
      if (state.some(({ selected }) => selected)) {
        return state.filter(({ selected }) => !selected);
      }
      return state;
    case UPDATE_BLOCK_BODY:
      return state.map((block) =>
        block.id === action.id
          ? { ...block, body: { ...block.body, ...action.body } }
          : block
      );
    default:
      return state;
  }
}
