// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import type { TextAlignment } from '@seine/core';

import ChartLayoutTitle from './ChartLayoutTitle';

const ChartLayoutContent = styled.div`
  height: 75%;
`;

const ChartLayoutDescription = styled.div`
  justify-content: ${({ textAlignment }) => textAlignment};
  display: flex;
  flex-wrap: wrap;
  align-items: start;
`;

const ChartLayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  position: relative;
  ${ChartLayoutTitle},
  ${ChartLayoutContent},
  ${ChartLayoutDescription} {
    width: 100%;
    margin-left: auto;
    margin-right: auto
  ${({ theme: { breakpoints } }) => css`
    max-width: 65vw;
    ${breakpoints.up('md')} {
      max-width: 35vw;
    }
  `}
  }
  ${({ visibility }) => visibility && { visibility }}
`;

type Props = {
  title: React.Node,
  children: React.Node,
  description: React.Node,
  textAlignment: TextAlignment,
};

/**
 * @description Common layout component for charts.
 * @param {Props} props
 * @returns {React.Node}
 */
export default React.forwardRef(function ChartLayout(
  { title, children, description, textAlignment, ...props }: Props,
  ref
) {
  const [content, ...extensions] = React.Children.toArray(children);

  return (
    <ChartLayoutContainer ref={ref} {...props}>
      <ChartLayoutTitle textAlignment={textAlignment}>{title}</ChartLayoutTitle>
      <ChartLayoutContent>{content}</ChartLayoutContent>
      <ChartLayoutDescription textAlignment={textAlignment}>
        {description}
      </ChartLayoutDescription>
      {extensions}
    </ChartLayoutContainer>
  );
});
