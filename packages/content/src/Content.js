// @flow
import * as React from 'react';
import type { Block } from '@seine/core';
import { blockTypes } from '@seine/core';
import { Draft } from '@seine/draft';
import { Chart } from '@seine/charts';
import type { Theme } from '@material-ui/core';
import { ThemeProvider } from '@seine/styles';
import { Table } from '@seine/tables';
import { useAutoMemo } from 'hooks.macro';

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
  as: Container = blockRenderMap[parent.type],
}: Props): React.Node {
  return (
    <ThemeProvider>
      <Container>
        {useAutoMemo(
          children
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
            })
        )}
      </Container>
    </ThemeProvider>
  );
}

export default Content;
