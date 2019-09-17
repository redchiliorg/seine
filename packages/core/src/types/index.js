// @flow
import type { Action } from '../reducers';

import type { PageBody, PageFormat } from './page';
import type { GridBody, GridFormat } from './grid';
import type { DraftBody, DraftFormat } from './draft';
import type { ChartBody, ChartFormat } from './charts';
import * as Page from './page';
import * as Grid from './grid';
import * as Draft from './draft';
import * as Charts from './charts';

export const blockTypes = {
  ...Page,
  ...Grid,
  ...Draft,
  ...Charts,
};

export type BlockType = $Values<typeof blockTypes>;

export type BlockBody = null | PageBody | GridBody | DraftBody | ChartBody;

export type BlockFormat =
  | null
  | PageFormat
  | GridFormat
  | DraftFormat
  | ChartFormat;

export type BlockId = string | null;

export type Block = {
  id: BlockId,
  body: BlockBody,
  format: BlockFormat,
  parent_id: BlockId,
  type: BlockType,
};

export type BlockEditor = {
  dispatch: (Action) => any,
  selection: BlockId[],
};

export * from './charts';
export * from './draft';
export * from './grid';
export * from './page';
export * from './theme';
