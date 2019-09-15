// @flow
import * as React from 'react';
import type { Block } from '@seine/core';
import { blockTypes } from '@seine/core';
import { Draft } from '@seine/draft';
import { Chart } from '@seine/charts';

import Grid from './Grid';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  parent: Block,
  children: $ReadOnlyArray<Block>,
  as?: React.ComponentType<*>,
};

export const defaultBlockRenderMap = {
  [blockTypes.PAGE]: ({ children }) => children,
  [blockTypes.GRID]: Grid,
  [blockTypes.DRAFT]: Draft,
  [blockTypes.CHART]: Chart,
};

/**
 * @description Content blocks default renderer.
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
