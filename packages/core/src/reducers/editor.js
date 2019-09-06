// @flow
import type { Block, BlockBody, BlockFormat, BlockId } from '../types';

export const CREATE_BLOCK = 'seine/editor/createBlock';
export const DELETE_SELECTED_BLOCKS = 'seine/editor/deleteSelectedBlocks';
export const SELECT_BLOCK = 'seine/editor/selectBlock';
export const UPDATE_BLOCK_BODY = 'seine/editor/updateBlockBody';
export const UPDATE_BLOCK_FORMAT = 'seine/editor/updateBlockFormat';

export const initialState = {
  selection: [],
  blocks: [],
};

export type CreateBlockAction = {
  type: typeof CREATE_BLOCK,
  block: $Shape<Block>,
};
export type DeleteSelectedBlocksAction = {
  type: typeof DELETE_SELECTED_BLOCKS,
};
export type SelectBlockAction = {
  type: typeof SELECT_BLOCK,
  id: BlockId,
  modifier?: 'add' | 'sub',
};
export type UpdateBlockDataAction = {
  type: typeof UPDATE_BLOCK_BODY,
  body: BlockBody,
};
export type UpdateBlockFormatAction = {
  type: typeof UPDATE_BLOCK_FORMAT,
  format: BlockFormat,
};
export type State = {
  selection: $ReadOnlyArray<BlockId>,
  blocks: Blocks,
};
export type Action =
  | CreateBlockAction
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
        blocks: [...state.blocks, action.block],
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
