// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ChildrenArray<any>,
  palette: string[],
};

const LegendBox = styled.div`
  background-color: ${({ color }) => color};
  width: 2em;
  height: 2em;
`;

const LegendLabel = styled.p`
  margin: 1em;
  ${({ maxWidth }) => ({ maxWidth })};
  white-space: pre-wrap;
`;

/**
 * @description Chart legend.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartLegend({ children, palette }: Props) {
  const childrenCount = React.Children.count(children);

  return React.Children.map(children, (title, index) => (
    <React.Fragment key={index}>
      <LegendBox color={palette[index % palette.length]} />
      <LegendLabel maxWidth={`calc(${100 / childrenCount}% - 3em)`}>
        {title}
      </LegendLabel>
    </React.Fragment>
  ));
}
