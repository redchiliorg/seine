import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { createBlock, blockTypes } from '@seine/core';
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
  blockTypes.PIE_CHART,
  {
    elements: [
      { title: 'repairs', percent: 12 },
      { title: 'consulting', percent: 10 },
      { title: 'training', percent: 8 },
      { title: 'product sales', percent: 64 },
      { title: 'others', percent: 6 },
    ],
  },
  { fontSize: 14, padding: 60 },
  page.id
);
export const barChart = createBlock(
  blockTypes.BAR_CHART,
  {
    elements: [
      { title: 'WFGLA', value: 20.8 },
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
  null,
  page.id
);
export const columnChart = createBlock(
  blockTypes.COLUMN_CHART,
  {
    elements: [
      { title: 'WFGLA', value: 20.8 },
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
  null,
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
          page,
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
