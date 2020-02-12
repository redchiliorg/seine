import * as React from 'react';
import styled from 'styled-components/macro';

const ChartLayoutContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  & > div {
    width: 100%;
  }
`;

const ChartLayoutTitle = styled.div`
  height: 12.5%;
  display: flex;
  align-items: center;
`;

const ChartLayoutContent = styled.div`
  height: 75%;
`;

const ChartLayoutDescription = styled.div`
  height: 12.5%;
  display: flex;
`;

type Props = {
  title: React.Node,
  children: React.Node,
  description: React.Node,
};

/**
 * @description Common layout component for charts.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartLayout({ title, children, description }: Props) {
  return (
    <ChartLayoutContainer>
      <ChartLayoutTitle>{title}</ChartLayoutTitle>
      <ChartLayoutContent>{children}</ChartLayoutContent>
      <ChartLayoutDescription>{description}</ChartLayoutDescription>
    </ChartLayoutContainer>
  );
}
