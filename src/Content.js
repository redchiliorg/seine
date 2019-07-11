// @flow
import * as React from 'react';

import Block from './Block';
import type { ContentBlock } from './types';

type Config = {
  component: string | React.ElementType,
  style: CSSStyleDeclaration,
};

type Props = Config & {
  children: ContentBlock[],
};

Content.defaultProps = {
  component: 'div',
  style: {},
};

export default function Content(props: Props) {
  const { children: blocks, style } = props;
  return (
    <props.component style={style}>
      {blocks.map(
        ({ id, data, parent_id, type }) =>
          !parent_id && (
            <Block {...data} key={id} type={type}>
              {blocks.map(
                ({ id: childId, data, parent_id, type }) =>
                  parent_id === id && (
                    <Block {...data} key={childId} type={type} />
                  )
              )}
            </Block>
          )
      )}
    </props.component>
  );
}
