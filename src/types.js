// @flow
export const blockTypes = {
  GRID: 'grid',
  DRAFT: 'draft',
  PIE: 'pie',
  TEXT: 'text',
};

export type BlockType = $Values<typeof blockTypes>;

export type GridData = {
  areas: (string | number)[] | 'none',
  columns: (string | number)[],
  rows: (string | number)[],
};

export type TextData = string;

export type DraftData = {
  entityMap: { [string]: mixed },
  contentBlocks: { [string]: mixed }[],
};

export type Data = GridData | TextData | DraftData;

export type ContentBlock = {
  data: Data,
  id: string,
  parent_id: string,
  type: BlockType,
};
