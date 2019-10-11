// @flow
import * as React from 'react';
import { blockTypes } from '@seine/core';
import type { Block } from '@seine/core';
import { Draft } from '@seine/draft';
import { Chart } from '@seine/charts';

import Grid from './Grid';
import Image from './Image';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  parent: Block,
  children: $ReadOnlyArray<Block>,
};

export const defaultBlockRenderMap = {
  [blockTypes.CHART]: Chart,
  [blockTypes.DRAFT]: Draft,
  [blockTypes.GRID]: Grid,
  [blockTypes.IMAGE]: Image,
  [blockTypes.PAGE]: ({ children }) => children,
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
          {...(format ? format : {})}
          {...(body ? body : {})}
          {...block}
        >
          <Content parent={block} blockRenderMap={blockRenderMap}>
            {children.filter((content) => content.id !== block.id)}
          </Content>
        </ContentBlock>
      );
    });
}

export default Content;
