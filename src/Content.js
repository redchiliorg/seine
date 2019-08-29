// @flow
import * as React from 'react';

import type { ContentBlock } from './types';
import { blockTypes } from './types';
import Grid from './Grid';
import Draft from './Draft';
import Pie from './Pie';
import Page from './Page';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  parent?: string,
  children: ContentBlock[],
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
}: Props) {
  return children
    .filter((block: ContentBlock) => block['parent_id'] === parent)
    .map((block: ContentBlock) => {
      const Block = blockRenderMap[block.type];
      const body = block.body || {};
      const format = block.format || {};
      return (
        <Block key={block.id} {...body} {...format}>
          <Content parent={block.id} blockRenderMap={blockRenderMap}>
            {children.filter((content) => content.id !== block.id)}
          </Content>
        </Block>
      );
    });
}

export default Content;
