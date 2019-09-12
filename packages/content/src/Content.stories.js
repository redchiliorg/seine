import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { createBlock, blockTypes, chartTypes } from '@seine/core';
import { toRawContent } from '@seine/draft';

import Content from './Content';
import { defaultGridColumns } from './Grid';

export const page = createBlock(blockTypes.PAGE);

export const draft = createBlock(
  blockTypes.DRAFT,
  toRawContent(
    'This block is draft.js content. Click here to edit the text.' +
      '\n\n' +
      'We are planning to add text formatting toolbar soon.' +
      '\n\n' +
      'Draft.js is a framework for building rich text editors in React,\n' +
      'powered by an immutable model and abstracting over cross-browser ' +
      'differences.'
  ),
  { verticalAlignment: 'center' },
  page.id
);

export const grid = createBlock(
  blockTypes.GRID,
  null,
  {
    columns: defaultGridColumns,
  },
  page.id
);

export const pieChart = createBlock(
  blockTypes.CHART,
  {
    elements: [
      { title: 'repairs', value: 12 },
      { title: 'consulting', value: 10 },
      { title: 'training', value: 8 },
      { title: 'product sales', value: 64 },
      { title: 'others', value: 6 },
    ],
  },
  {
    kind: chartTypes.PIE,
  },
  page.id
);

export const barChart = createBlock(
  blockTypes.CHART,
  {
    elements: [
      { title: 'WFLA', value: 20.8 },
      { title: 'Region A', value: 35.7 },
      { title: 'Region B', value: 15.8 },
      { title: 'Region C', value: 40.9 },
      { title: 'Region D', value: 23.6 },
      { title: 'Region E', value: 17.6 },
      { title: 'Region F', value: 38.1 },
      { title: 'Region G', value: 43.8 },
      { title: 'Region H', value: 16.4 },
    ],
  },
  {
    kind: chartTypes.BAR,
  },
  page.id
);

export const columnChart = createBlock(
  blockTypes.CHART,
  {
    elements: [
      { title: 'Maelstorm', value: 50.1, group: 'Group 1' },
      { title: 'Spring', value: 60.33, group: 'Group 1' },
      { title: 'Electro', value: 13.0, group: 'Group 1' },
      { title: 'Maelstorm', value: 90.0, group: 'Group 2' },
      { title: 'Spring', value: 100.22, group: 'Group 2' },
      { title: 'Electro', value: 14.0, group: 'Group 2' },
      { title: 'Maelstorm', value: 66.0, group: 'Group 3' },
      { title: 'Spring', value: 19.0, group: 'Group 3' },
      { title: 'Electro', value: 19.0, group: 'Group 3' },
    ],
  },
  {
    kind: chartTypes.COLUMN,
  },
  page.id
);

export const title = createBlock(
  blockTypes.DRAFT,
  toRawContent('<h2>V2. London income - Year 8 - 3,400,000</h2>'),
  { textAlignment: 'center' },
  page.id
);

storiesOf('Content', module)
  .add('1. Draft', () => (
    <div className={'mui-panel'}>
      <Content parent={page}>{[draft]}</Content>
    </div>
  ))
  .add('2. Pie', () => (
    <div className={'mui-panel'}>
      <Content parent={page}>{[pieChart]}</Content>
    </div>
  ))
  .add('3. Pie and draft', () => (
    <div className={'mui-panel'}>
      <Content parent={page}>
        {[
          grid,
          { ...pieChart, parent_id: grid.id },
          { ...draft, parent_id: grid.id },
        ]}
      </Content>
    </div>
  ))
  .add('4. Draft and titled pie', () => (
    <div className={'mui-panel'}>
      <Content parent={page}>
        {[
          grid,
          { ...draft, parent_id: grid.id },
          { ...grid, id: 'sub-grid', parent_id: grid.id },
          { ...title, parent_id: 'sub-grid' },
          { ...pieChart, parent_id: 'sub-grid' },
        ]}
      </Content>
    </div>
  ))
  .add('6. Bar chart', () => (
    <div className={'mui-panel'}>
      <Content parent={page}>
        {[grid, { ...barChart, parent_id: grid.id }]}
      </Content>
    </div>
  ))
  .add('7. Column chart', () => (
    <div className={'mui-panel'}>
      <Content parent={page}>
        {[
          { ...grid, format: null },
          { ...columnChart, parent_id: grid.id },
          { ...draft, parent_id: grid.id },
        ]}
      </Content>
    </div>
  ));
