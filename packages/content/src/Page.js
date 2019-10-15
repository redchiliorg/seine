// @flow
import * as React from 'react';
import styled from 'styled-components';

import Grid from './Grid';

type Props = {
  as: React.ComponentType<any>,
  children: React.ChildrenArray<any>,
};

const ChartContainer = styled((props) => <Grid {...props} columns={'100%'} />)`
  & {
    padding: 20%;
  }
`;

/**
 * @description Default page renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Page({ children }) {
  return React.Children.map(children, (child) =>
    React.isValidElement(child) && child.props.type === 'chart' ? (
      <ChartContainer key={['chart-container', child.key]}>
        {child}
      </ChartContainer>
    ) : (
      child
    )
  );
}
