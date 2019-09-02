// @flow
import * as React from 'react';
import type { Block } from '@seine/core';
import { blockTypes } from '@seine/core';
import { Draft } from '@seine/draft';
import { Pie } from '@seine/pie';

import Grid from './Grid';
import Page from './Page';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  parent?: string | null,
  children: $ReadOnlyArray<Block>,
};

export const defaultBlockRenderMap = {
  [blockTypes.PAGE]: Page,
  [blockTypes.DRAFT]: Draft,
  [blockTypes.GRID]: Grid,
  [blockTypes.PIE]: Pie,
};

/**
 * @description Structured content.
 * @param {Props} props
 * @returns {React.Node}
 */
function Content({
  blockRenderMap = defaultBlockRenderMap,
  parent = null,
  children,
}: Props): React.Node {
  return children
    .filter((block: Block) => block['parent_id'] === parent)
    .map(({ body, format, ...block }: Block) => {
      const ContentBlock = blockRenderMap[block.type];
      return (
        <ContentBlock
          key={block.id}
          {...block}
          {...(format ? format : {})}
          {...(body ? body : {})}
        >
          <Content parent={block.id} blockRenderMap={blockRenderMap}>
            {children.filter((content) => content.id !== block.id)}
          </Content>
        </ContentBlock>
      );
    });
}

export default Content;
