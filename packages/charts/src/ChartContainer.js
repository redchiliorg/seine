// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { ResizeContainer } from '@seine/styles';

const StyledChartContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-around;
  padding-top: ${({ marginTop }) => marginTop}px;
  position: relative;
  width: 100%;
`;

type Props = {
  children: React.ChildrenArray,
};

/**
 * @description  Chart container with forced update on resize behaviour.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartContainer({ children, ...containerProps }: Props) {
  return (
    <ResizeContainer as={StyledChartContainer} {...containerProps}>
      {children}
    </ResizeContainer>
  );
}
