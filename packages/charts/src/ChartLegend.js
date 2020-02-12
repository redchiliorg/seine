// @flow
import * as React from 'react';
import styled from 'styled-components';
import type { ChartElement } from '@seine/core';

type Props = {
  elements: ChartElement[],
  palette: string[],
  size: number,
};

const LegendBox = styled.div`
  && {
    background-color: ${({ color }) => color};
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
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
      {title}
    </LegendItem>
  ));
}
