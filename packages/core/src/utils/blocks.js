// @flow
import uuid from 'uuid/v4';

import type {
  Block,
  BlockBody,
  BlockFormat,
  BlockId,
  BlockType,
} from '../types';

type Blocks = $ReadOnlyArray<Block>;
type BlocksTree = Block & {
  children: BlocksTree[],
};

const defaultBlockBody = {};
const defaultBlockFormat = {};

/**
 * @description Create a block of the parent.
 * @param {BlockType} type
 * @param {?BlockBody} body
 * @param {?BlockFormat} format
 * @param {?BlockId} parent_id
 * @returns {Block}
 */
export function createBlock(
  type: BlockType,
  body: ?BlockBody = null,
  format: ?BlockFormat = null,
  parent_id: ?BlockId = null
): Block {
  body = body || defaultBlockBody;
  format = format || defaultBlockFormat;
  return { id: uuid(), type, body, format, parent_id };
}

/**
 * @description Create blocks from tree.
 * @param {Block} parent
 * @param {BlocksTree[]} tree
 * @returns {Block[]}
 */
export function createBlocksFromTree(parent, tree: BlocksTree[]): Blocks[] {
  return [
    parent,
    ...tree.reduce((acc, { children, body, format, type }) => {
      const block = createBlock(type, body, format, parent.id);
      return [
        ...acc,
        ...(children ? createBlocksFromTree(block, children) : [block]),
      ];
    }, []),
  ];
}
