// @flow
import type { BlocksAction, BlocksCreateAction } from '../reducers';

import type { ChartBody, ChartElement, ChartFormat } from './charts';
import * as Charts from './charts';
import type { DraftBody, DraftFormat } from './draft';
import * as Draft from './draft';
import type { GridBody, GridFormat } from './grid';
import * as Grid from './grid';
import type { ImageBody, ImageFormat } from './image';
import * as Image from './image';
import type { PageBody, PageFormat } from './page';
import * as Page from './page';

export * from './charts';
export * from './draft';
export * from './grid';
export * from './image';
export * from './page';
export * from './theme';

const { chartTypes, ...Chart }: { ...*, CHART: * } = Charts;

export const blockTypes = {
  ...Chart,
  ...Draft,
  ...Grid,
  ...Image,
  ...Page,
};

export type BlockElement = ChartElement;

export type BlockType = $Values<typeof blockTypes>;

export type BlockBody =
  | null
  | ChartBody
  | DraftBody
  | GridBody
  | ImageBody
  | PageBody;

export type BlockFormat =
  | null
  | ChartFormat
  | DraftFormat
  | GridFormat
  | ImageFormat
  | PageFormat;

export type BlockId = string | null;

export type Block = {
  id: BlockId,
  body: BlockBody,
  format: BlockFormat,
  parent_id: BlockId,
  type: BlockType,
};

export type AddButtonProps = $Rest<
  BlocksCreateAction,
  {| block: Block, type: string |}
> & {
  dispatch: (BlocksAction) => any,
};

export type BlockEditor = {
  addButtonRenderMap: {
    [BlockType]: React$Component<AddButtonProps>,
  },
  dispatch: (BlocksAction) => any,
  editor: { [string]: any },
  selection: BlockId[],
};

export type ToolbarProps = (Block & BlockEditor) & {
  children?: React$Node,
};
