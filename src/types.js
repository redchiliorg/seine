// @flow
import type { RawDraftContentState } from 'draft-js/lib/RawDraftContentState';

export const blockTypes = {
  DRAFT: 'draft',
  GRID: 'grid',
  PIE: 'pie',
};

export type BlockType = $Values<typeof blockTypes>;

export type DraftData = {
  children: RawDraftContentState,
  textAlignment: 'left' | 'center' | 'right',
};

export type GridData = {
  areas?: string,
  columns?: string,
  columnGap?: string,
  justifyContent?: string,
  rows?: string,
  rowGap?: string,
};

export type PieElement = {
  title: string,
  percent: number,
  color: string,
};

export type PieData = {
  children: PieElement[],
};

export type BlockData = GridData | DraftData | PieData;

export type ContentBlock = {
  id: string,
  data: BlockData,
  parent_id: string | null,
  type: BlockType,
};
