// @flow
import * as React from 'react';

import type { ContentBlock } from './types';
import { blockTypes } from './types';
import Grid from './Grid';
import Draft from './Draft';
import Pie from './Pie';

type Props = ContentBlock & {
  children: ContentBlock[],
};

/**
 * @description Structured content of children.
 * @param {Props} props
 * @returns {React.Node}
 */
function Content({
  id = null,
  type = null,
  parent_id = null,
  children = [],
  data = {},
}: $Shape<Props>) {
  children =
    type === blockTypes.DRAFT ? (
      <Draft {...data} readOnly>
        {data.children}
      </Draft>
    ) : type === blockTypes.PIE ? (
      <Pie {...data}>{data.children}</Pie>
    ) : (
      children
        .filter((child) => child['parent_id'] === id)
        .map((child) => (
          <Content key={child.id} {...child}>
            {children.filter(
              (child) => child.id !== id && child.id !== parent_id
            )}
          </Content>
        ))
    );
  if (type === blockTypes.GRID) {
    return <Grid {...data}>{children}</Grid>;
  }
  return children;
}

export default Content;
