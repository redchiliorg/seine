// @flow
import * as React from 'react';
import type { Block } from '@seine/core';
import { blockTypes } from '@seine/core';
import { Draft } from '@seine/draft';
import { Chart } from '@seine/charts';
import { ThemeProvider } from 'styled-components/macro';
import type { Theme } from '@material-ui/core';
import { defaultContentTheme } from '@seine/styles';

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
  theme = defaultContentTheme,
  as: DefaultContainer = blockRenderMap[parent.type],
}: Props): React.Node {
  const Container = React.useCallback(
    ({ children }) =>
      parent.parent_id ? (
        children
      ) : parent.id ? (
        <DefaultContainer>{children}</DefaultContainer>
      ) : (
        <ThemeProvider theme={theme}>
          <DefaultContainer>{children}</DefaultContainer>
        </ThemeProvider>
      ),
    [parent.id, parent.parent_id, theme]
  );

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
