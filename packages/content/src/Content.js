// @flow
import * as React from 'react';
import { blockTypes } from '@seine/core';
import type { Block } from '@seine/core';
import { Draft } from '@seine/draft';
import { Chart } from '@seine/charts';

import Grid from './Grid';
import Image from './Image';
import Page from './Page';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  parent: Block,
  children: $ReadOnlyArray<Block>,
};

export const defaultBlockRenderMap = {
  [blockTypes.CHART]: Chart,
  [blockTypes.RichText]: Draft,
  [blockTypes.GRID]: Grid,
  [blockTypes.IMAGE]: Image,
  [blockTypes.PAGE]: Page,
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
  as: Container = parent.parent_id
    ? React.Fragment
    : blockRenderMap[parent.type],
}: Props): React.Node {
  return (
    <Container>
      {children
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
        })}
    </Container>
  );
}

export default Content;
