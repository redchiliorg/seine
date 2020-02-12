// @flow
import * as React from 'react';
import styled from 'styled-components';
import type { ChartElement } from '@seine/core';

type Props = {
  elements: ChartElement[],
  palette: string[],
};

const LegendBox = styled.div`
  background-color: ${({ color }) => color};
  display: inline-block;
  width: 2em;
  height: 2em;
`;

const LegendLabel = styled.p`
  display: inline-block;
  margin: 0.5em;
  white-space: pre-wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

/**
 * @description Chart legend.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartLegend({ elements, palette }: Props) {
  return elements.map(({ title }, index) => (
    <LegendItem key={index}>
      <LegendBox color={palette[index % palette.length]} />
      <LegendLabel>{title}</LegendLabel>
    </LegendItem>
  ));
}
