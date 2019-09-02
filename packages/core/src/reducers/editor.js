// @flow
import uuid from 'uuid/v4';

import type { Block, BlockBody, BlockFormat, BlockId } from '../types';

export const CREATE_BLOCK = 'seine/editor/createBlock';
export const CREATE_BLOCKS_TREE = 'seine/editor/createBlocksTree';
export const DELETE_SELECTED_BLOCKS = 'seine/editor/deleteSelectedBlocks';
export const SELECT_BLOCK = 'seine/editor/selectBlock';
export const UPDATE_BLOCK_BODY = 'seine/editor/updateBlockBody';
export const UPDATE_BLOCK_FORMAT = 'seine/editor/updateBlockFormat';

export const initialState = {
  selection: [],
  blocks: [],
};
type Blocks = $ReadOnlyArray<Block>;
export type BlocksTree = Block & {
  children: BlocksTree[],
};
type CreateBlockAction = {
  type: typeof CREATE_BLOCK,
  block: Block,
};
type CreateBlocksTreeAction = {
  type: typeof CREATE_BLOCKS_TREE,
  children: BlocksTree[],
};
type DeleteSelectedBlocksAction = {
  type: typeof DELETE_SELECTED_BLOCKS,
};
type SelectBlockAction = {
  type: typeof SELECT_BLOCK,
  id: BlockId,
  modifier?: 'add' | 'sub',
};
type UpdateBlockDataAction = {
  type: typeof UPDATE_BLOCK_BODY,
  body: BlockBody,
};
type UpdateBlockFormatAction = {
  type: typeof UPDATE_BLOCK_FORMAT,
  format: BlockFormat,
};
export type State = {
  selection: $ReadOnlyArray<BlockId>,
  blocks: Blocks,
};
export type Action =
  | CreateBlockAction
  | CreateBlocksTreeAction
  | DeleteSelectedBlocksAction
  | SelectBlockAction
  | UpdateBlockDataAction
  | UpdateBlockFormatAction;

/**
 * @description Reduce Content editor actions
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export default function reduce(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case SELECT_BLOCK: {
      const index = state.selection.indexOf(action.id);

      switch (action.modifier) {
        case 'add': {
          if (index !== -1) {
            return state;
          }
          return {
            ...state,
            selection: [...state.selection, action.id],
          };
        }

        case 'sub':
          if (index === -1) {
            return state;
          }
          return {
            ...state,
            selection: [
              ...state.selection.slice(0, index),
              ...state.selection.slice(index + 1),
            ],
          };

        default:
          return { ...state, selection: [action.id] };
      }
    }

    case CREATE_BLOCK:
      return {
        ...state,
        blocks: [...state.blocks, createBlock(action.block)],
      };

    case CREATE_BLOCKS_TREE:
      return {
        ...state,
        blocks: [...state.blocks, ...createBlocksTree(action.children)],
      };

    case DELETE_SELECTED_BLOCKS:
      if (state.selection.length === 0) {
        return state;
      }
      return {
        ...state,
        selection: [],
        blocks: state.blocks.filter(({ id }) => !state.selection.includes(id)),
      };

    case UPDATE_BLOCK_BODY:
    case UPDATE_BLOCK_FORMAT: {
      const index = state.blocks.findIndex(({ id }) =>
        state.selection.includes(id)
      );

      if (index === -1) {
        return {
          ...state,
          error: 'Selection is empty or invalid.',
        };
      }

      if (state.selection.length > 1) {
        return {
          ...state,
          error: 'There is more than one block in selection.',
        };
      }

      const block = state.blocks[index];
      return {
        ...state,
        blocks: [
          ...state.blocks.slice(0, index),
          {
            ...block,
            ...(action.type === UPDATE_BLOCK_BODY
              ? { body: { ...block.body, ...action.body } }
              : { format: { ...block.format, ...action.format } }),
          },
          ...state.blocks.slice(index + 1),
        ],
      };
    }

    default:
      return state;
  }
}

/**
 * @description Create a block of the parent.
 * @param {Block} data
 * @param {string} parent_id
 * @returns {Block}
 */
function createBlock(
  { id, body, format, ...block }: Block,
  parent_id = null
): Block {
  return {
    id: id || uuid(),
    parent_id,
    ...(body ? { body } : {}),
    ...(format ? { format } : {}),
    ...block,
  };
}

/**
 * @description Create blocks from tree.
 * @param {BlocksTree[]} children
 * @param {string} parent_id
 * @returns {Block[]}
 */
function createBlocksTree(children: BlocksTree[], parent_id = null) {
  return children.reduce((acc, { children, ...data }) => {
    const block = createBlock(data, parent_id);
    return [
      ...acc,
      block,
      ...(children ? createBlocksTree(children, block.id) : []),
    ];
  }, []);
}
