// @flow
export const blockTypes = {
  DRAFT: 'draft',
  GRID: 'grid',
  PIE: 'pie',
};

export type BlockType = $Values<typeof blockTypes>;

export type DraftData = {
  body: {
    entityMap: { [string]: mixed },
    contentBlocks: { [string]: mixed }[],
  },
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

export type Data = GridData | DraftData;

export type ContentBlock = {
  data: Data,
  id: string,
  parent_id: string,
  type: BlockType,
};
