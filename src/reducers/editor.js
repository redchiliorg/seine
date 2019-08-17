// @flow
import uuid from 'uuid/v1';

import type { ContentBlock, BlockData } from '../types';

export const CREATE_BLOCK = 'seine/editor/createBlock';
export const CREATE_BLOCKS_TREE = 'seine/editor/createBlocksTree';
export const DELETE_SELECTED = 'seine/editor/deleteSelected';
export const SELECT_BLOCK = 'seine/editor/selectBlock';
export const DESELECT_BLOCK = 'seine/editor/deselectBlock';

export const initialState = [];

export type BlocksTree = BlockData & {
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
  type: typeof SELECT_BLOCK,
  id: string,
};
export type Action =
  | CreateBlockAction
  | CreateBlocksTreeAction
  | DeleteSelectedBlockAction
  | SelectBlockAction
  | DeselectBlockAction;

/**
 * @description Create a block of the parent.
 * @param {BlockData} block
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
 * @returns {BlockData[]}
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
 * @description Reduce Content editor actions
 * @param {BlockData[]} state
 * @param {Action} action
 * @returns {BlockData[]}
 */
export default function reduce(
  state: BlockData[] = initialState,
  action: Action
) {
  switch (action.type) {
    case CREATE_BLOCK:
      return [...state, createBlock(action.block)];
    case DELETE_SELECTED:
      return state.filter((block) => !block.selected);
    case SELECT_BLOCK:
      return state.map((block) =>
        block.id === action.id && !block.selected
          ? { ...block, selected: true }
          : block
      );
    case DESELECT_BLOCK:
      return state.map((block) =>
        block.id === action.id && block.selected
          ? { ...block, selected: false }
          : block
      );
    case CREATE_BLOCKS_TREE:
      return [...state, ...createBlocksTree(action.children)];
    default:
      return state;
  }
}
