// @flow
import type { RawDraftContentState } from 'draft-js/lib/RawDraftContentState';

export const blockTypes = {
  PAGE: 'page',
  DRAFT: 'draft',
  GRID: 'grid',
  PIE: 'pie',
};

export type BlockType = $Values<typeof blockTypes>;

// region Page
export type PageBody = {};
export type PageFormat = {};
// endregion

// region Grid
export type GridBody = {};
export type GridFormat = {
  columns?: string,
  columnGap?: string,
  rows?: string,
  rowGap?: string,
};
// endregion

// region Pie
export type PieElement = {
  title: string,
  percent: number,
  color: string,
};
export type PieBody = {
  elements: PieElement[],
};
export type PieFormat = {
  fontSize: number,
  innerFontColor: string,
  outerFontColor: string,
  padding: number,
  size: number,
};
// endregion

// region Draft
export type DraftBody = RawDraftContentState;
export type DraftFormat = {
  textAlignment: 'left' | 'center' | 'right',
  verticalAlignment: 'start' | 'center' | 'end',
};
// endregion

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
