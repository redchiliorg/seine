// @flow
import * as React from 'react';
import type { Block } from '@seine/core';
import { blockTypes } from '@seine/core';
import { Draft } from '@seine/draft';
import { BarChart, ColumnChart, PieChart } from '@seine/charts';

import Grid from './Grid';
import Page from './Page';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  parent: Block,
  children: $ReadOnlyArray<Block>,
};

export const defaultBlockRenderMap = {
  [blockTypes.PAGE]: Page,
  [blockTypes.GRID]: Grid,

  [blockTypes.DRAFT]: Draft,

  [blockTypes.BAR_CHART]: BarChart,
  [blockTypes.COLUMN_CHART]: ColumnChart,
  [blockTypes.PIE_CHART]: PieChart,
};

/**
 * @description Structured content.
 * @param {Props} props
 * @returns {React.Node}
 */
function Content({
  blockRenderMap = defaultBlockRenderMap,
  parent,
  children,
}: Props): React.Node {
  return children
    .filter((block: Block) => block['parent_id'] === parent.id)
    .map(({ body, format, ...block }: Block) => {
      const ContentBlock = blockRenderMap[block.type];
      return (
        <ContentBlock
          key={block.id}
          {...block}
          {...(format ? format : {})}
          {...(body ? body : {})}
        >
          <Content parent={block} blockRenderMap={blockRenderMap}>
            {children.filter((content) => content.id !== block.id)}
          </Content>
        </ContentBlock>
      );
    });
}

export default Content;
