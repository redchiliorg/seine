// @flow
import type { BlocksAction, BlocksCreateAction } from '../reducers';

import type { ChartBody, ChartElement, ChartFormat } from './charts';
import { CHART } from './charts';
import type { RichTextBody, RichTextFormat } from './richText';
import { RICH_TEXT } from './richText';
import type { GridBody, GridFormat } from './grid';
import { GRID } from './grid';
import type { ImageBody, ImageFormat } from './image';
import { IMAGE } from './image';
import type { PageBody, PageFormat } from './page';
import { PAGE } from './page';
import type { TableBody, TableFormat } from './tables';
import { TABLE } from './tables';

export * from './charts';
export * from './richText';
export * from './grid';
export * from './image';
export * from './page';
export * from './tables';
export * from './theme';

export const blockTypes = {
  CHART,
  RICH_TEXT,
  GRID,
  IMAGE,
  PAGE,
  TABLE,
};

export type BlockElement = ChartElement;

export type BlockType = $Values<typeof blockTypes>;

export type BlockBody =
  | null
  | ChartBody
  | RichTextBody
  | GridBody
  | ImageBody
  | PageBody
  | TableBody;

export type BlockFormat =
  | null
  | ChartFormat
  | RichTextFormat
  | GridFormat
  | ImageFormat
  | PageFormat
  | TableFormat;

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
  mode: 'default' | 'fullscreen',
  selection: BlockId[],
};

export type ToolbarProps = (Block & BlockEditor) & {
  children?: React$Node,
};
