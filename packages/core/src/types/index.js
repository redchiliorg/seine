// @flow
import type { Action } from '../reducers';

import type { PageBody, PageFormat } from './page';
import { PAGE } from './page';
import type { GridBody, GridFormat } from './grid';
import { GRID } from './grid';
import type { DraftBody, DraftFormat } from './draft';
import { DRAFT } from './draft';
import type { PieBody, PieFormat } from './pie';
import { PIE } from './pie';
import type { BarchartBody, BarchartFormat } from './barchart';
import { BARCHART } from './barchart';

export type { PieElement } from './pie';

export const blockTypes = { GRID, PAGE, DRAFT, PIE, BARCHART };

export type BlockType = $Values<typeof blockTypes>;

export type BlockBody =
  | null
  | PageBody
  | GridBody
  | DraftBody
  | PieBody
  | BarchartBody;

export type BlockFormat =
  | null
  | PageFormat
  | GridFormat
  | DraftFormat
  | PieFormat
  | BarchartFormat;

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

export type {
  GridBody,
  GridFormat,
  PageBody,
  PageFormat,
  DraftBody,
  DraftFormat,
  PieBody,
  PieFormat,
  BarchartBody,
  BarchartFormat,
};
