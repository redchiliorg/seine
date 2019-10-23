// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

export type Props = {
  children: string,
};

const Title = styled.h1`
  text-align: left;
  line-height: 3;
  width: 100%;
`;

/**
 * @description Title of bar chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartTitle({ children }: Props) {
  return <Title>{children}</Title>;
}
