// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import type { ChartElement } from '@seine/core';

import { defaultChartPalette } from './constants';

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

export type Props = {
  elements: ChartElement[],
  palette?: string[],
};

/**
 * @description Chart legend.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartLegend({
  elements,
  palette = defaultChartPalette,
}: Props) {
  return elements.map(({ title }, index) => (
    <LegendItem key={index}>
      <LegendBox color={palette[index % palette.length]} />
      <LegendLabel>{title}</LegendLabel>
    </LegendItem>
  ));
}
