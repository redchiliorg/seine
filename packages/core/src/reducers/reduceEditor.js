// @flow
import { equals } from 'ramda';

import type { Block, BlockBody, BlockFormat, BlockId } from '../types';

opaque type BlockExtension = {
  editor: { [string]: any },
};
export type State = {
  selection: $ReadOnlyArray<BlockId>,
  blocks: $ReadOnlyArray<Block & BlockExtension>,
};
export const initialEditor = {
  selection: [],
  blocks: [],
};

export const CREATE_BLOCK = '@seine/editor/createBlock';
export type CreateBlockAction = {
  type: typeof CREATE_BLOCK,
  block: $Shape<Block>,
};

export const DELETE_SELECTED_BLOCKS = '@seine/editor/deleteSelectedBlocks';
export type DeleteSelectedBlocksAction = {
  type: typeof DELETE_SELECTED_BLOCKS,
};

export const SELECT_BLOCK = '@seine/editor/selectBlock';
export type SelectBlockAction = {
  type: typeof SELECT_BLOCK,
  id: BlockId,
  modifier?: 'add' | 'sub',
};

export const UPDATE_BLOCK_BODY = '@seine/editor/updateBlockBody';
export type UpdateBlockDataAction = {
  type: typeof UPDATE_BLOCK_BODY,
  body: BlockBody,
};

export const UPDATE_BLOCK_FORMAT = '@seine/editor/updateBlockFormat';
export type UpdateBlockFormatAction = {
  type: typeof UPDATE_BLOCK_FORMAT,
  format: BlockFormat,
};

//
// Memoize editor's inner state.
//
// Should be cleaned in onChange callbacks as it is
// done in ContentEditor component.
//
export const UPDATE_BLOCK_EDITOR = '@seine/editor/updateBlockEditor';
export type UpdateBlockEditorAction = {
  type: typeof UPDATE_BLOCK_EDITOR,
  editor: any,
};

export type Action =
  | CreateBlockAction
  | DeleteSelectedBlocksAction
  | SelectBlockAction
  | UpdateBlockDataAction
  | UpdateBlockFormatAction
  | UpdateBlockEditorAction;

/**
 * @description Reduce Content editor actions
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export default function reduceEditor(
  state: State = initialEditor,
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
    case UPDATE_BLOCK_EDITOR:
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
      if (
        action.type !== UPDATE_BLOCK_EDITOR ||
        !block.editor ||
        !Object.entries(action.editor).every(([key, value]) =>
          equals(value, block.editor[key])
        )
      ) {
        return {
          ...state,
          blocks: [
            ...state.blocks.slice(0, index),
            {
              ...block,
              ...(action.type === UPDATE_BLOCK_BODY
                ? { body: { ...block.body, ...action.body } }
                : action.type === UPDATE_BLOCK_EDITOR
                ? { editor: { ...block.editor, ...action.editor } }
                : { format: { ...block.format, ...action.format } }),
            },
            ...state.blocks.slice(index + 1),
          ],
        };
      }
      return state;
    }

    default:
      return state;
  }
}
