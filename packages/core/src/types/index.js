// @flow
import type { GridBody, GridFormat } from './grid';
import type { PageBody, PageFormat } from './page';
import type { DraftBody, DraftFormat } from './draft';
import type { PieBody, PieFormat } from './pie';
import { GRID } from './grid';
import { PAGE } from './page';
import { DRAFT } from './draft';
import { PIE } from './pie';

export const blockTypes = { GRID, PAGE, DRAFT, PIE };

export type BlockType = $Values<typeof blockTypes>;

export type BlockBody = null | PageBody | GridBody | PieBody | DraftBody;

export type BlockFormat =
  | null
  | PageFormat
  | GridFormat
  | PieFormat
  | DraftFormat;

export type BlockId = string | null;

export type Block = {
  id: BlockId,
  body: BlockBody,
  format: BlockFormat,
  parent_id: BlockId,
  type: BlockType,
};

export type BlockEditor = {
  selection: $ReadOnlyArray<BlockId>,
};

export type {
  GridBody,
  GridFormat,
  PageBody,
  PageFormat,
  DraftBody,
  DraftFormat,
  PieBody,
  PieFormat,
};
