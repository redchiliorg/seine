// @flow
import * as React from 'react';

import type { ContentBlock } from './types';
import { blockTypes } from './types';
import Grid from './Grid';
import Draft from './Draft';
import Pie from './Pie';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  parent?: string,
  children: ContentBlock[],
};

export const defaultBlockRenderMap = {
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
    .filter((block) => block['parent_id'] === parent)
    .map((block) => {
      const Block = blockRenderMap[block.type];
      return (
        <Block key={block.id} {...block.data}>
          <Content parent={block.id} blockRenderMap={blockRenderMap}>
            {children.filter((content) => content.id !== block.id)}
          </Content>
        </Block>
      );
    });
}

export default Content;
