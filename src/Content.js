// @flow
import * as React from 'react';

import Block from './Block';
import type { ContentBlock } from './types';

type Config = {
  component: string | React.ElementType,
};

type Props = Config & {
  breakpointId: string,
  breakpoints: string[],
  children: ContentBlock[],
};

Content.defaultProps = {
  component: React.Fragment,
};

export default function Content(props: Props) {
  const { breakpoints, breakpointId, children } = props;
  const childProps = { breakpoints, breakpointId };
  return (
    <props.component>
      {children.map(
        ({ id, data, parent_id, type }) =>
          !parent_id && (
            <Block {...childProps} data={data} key={id} type={type}>
              {children.map(
                ({ id: childId, data, parent_id, type }) =>
                  parent_id === id && (
                    <Block
                      {...childProps}
                      data={data}
                      key={childId}
                      type={type}
                    />
                  )
              )}
            </Block>
          )
      )}
    </props.component>
  );
}
