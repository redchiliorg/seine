// @flow
import * as React from 'react';

import type { Block } from './types';
import { blockTypes } from './types';
import Grid from './Grid';
import Draft from './Draft';
import Pie from './Pie';
import Page from './Page';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  parent?: string,
  children: Block[],
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
    .filter((block: Block) => block['parent_id'] === parent)
    .map(({ body, format, ...block }: Block) => {
      const ContentBlock = blockRenderMap[block.type];
      return (
        <ContentBlock
          key={block.id}
          {...block}
          {...(!!format && format)}
          {...(!!body && body)}
        >
          <Content parent={block.id} blockRenderMap={blockRenderMap}>
            {children.filter((content) => content.id !== block.id)}
          </Content>
        </ContentBlock>
      );
    });
}

export default Content;
