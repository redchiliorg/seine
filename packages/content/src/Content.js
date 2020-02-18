// @flow
import * as React from 'react';
import type { Block } from '@seine/core';
import { blockTypes } from '@seine/core';
import { Draft } from '@seine/draft';
import { Chart } from '@seine/charts';
import { ResizeObserverProvider, ThemeProvider } from '@seine/styles';
import type { Theme } from '@material-ui/core';
import { Table } from '@seine/tables';

import Grid from './Grid';
import Image from './Image';
import Page from './Page';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  children: $ReadOnlyArray<Block>,
  parent: Block,
  theme?: $Shape<Theme>,
};

export const defaultBlockRenderMap = {
  [blockTypes.CHART]: Chart,
  [blockTypes.RICH_TEXT]: Draft,
  [blockTypes.GRID]: Grid,
  [blockTypes.IMAGE]: Image,
  [blockTypes.PAGE]: Page,
  table: Table,
};

/**
 * @description Content blocks default renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
function Content({
  blockRenderMap = defaultBlockRenderMap,
  children,
  parent,
  as: Container = parent['parent_id']
    ? React.Fragment
    : blockRenderMap[parent.type],
}: Props): React.Node {
  return (
    <ThemeProvider>
      <ResizeObserverProvider>
        <Container>
          {children
            .filter((block: Block) => block['parent_id'] === parent.id)
            .map(({ body, format, ...block }: Block) => {
              const ContentBlock = blockRenderMap[block.type];
              const blockChildren = children.filter(
                (content) => content.id !== block.id
              );
              return (
                <ContentBlock
                  key={block.id}
                  {...(format ? format : {})}
                  {...(body ? body : {})}
                  {...block}
                >
                  {blockChildren.length ? (
                    <Content parent={block} blockRenderMap={blockRenderMap}>
                      {blockChildren}
                    </Content>
                  ) : null}
                </ContentBlock>
              );
            })}
        </Container>
      </ResizeObserverProvider>
    </ThemeProvider>
  );
}

export default Content;
