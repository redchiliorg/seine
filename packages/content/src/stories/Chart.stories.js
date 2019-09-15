import * as React from 'react';

import Content from '../Content';
import { barChart, charts, columnChart, page, pieChart } from '../mocks';

export default { title: 'Content of charts' };

export const Pie = () => <Content parent={page}>{[pieChart]}</Content>;

export const Bar = () => <Content parent={page}>{[barChart]}</Content>;

export const Column = () => <Content parent={page}>{[columnChart]}</Content>;

export const ThreeGroupsOfThreeColumns = () => (
  <Content parent={page}>{[charts[0]]}</Content>
);

export const ThreeGroupsOfFiveColumns = () => (
  <Content parent={page}>{[charts[1]]}</Content>
);

export const FourGroupsOThreeColumns = () => (
  <Content parent={page}>{[charts[2]]}</Content>
);
