import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { createBlock, blockTypes } from '@seine/core';
import { toRawContent } from '@seine/draft';
import { action } from '@storybook/addon-actions';

import ContentEditor from './ContentEditor';

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
    columns: 'repeat(auto-fit, minmax(300px, 1fr))',
  },
  page.id
);
export const pie = createBlock(
  blockTypes.PIE,
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
export const barchart = createBlock(
  blockTypes.BARCHART,
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

const actions = {
  onChange: action('onChange'),
};
storiesOf('ContentEditor', module)
  .add('1. Empty', () => <ContentEditor {...actions} parent={page} />)
  .add('2. Draft', () => (
    <ContentEditor {...actions} parent={page}>
      {[draft]}
    </ContentEditor>
  ))
  .add('3. Pie', () => (
    <ContentEditor {...actions} parent={page}>
      {[pie]}
    </ContentEditor>
  ))
  .add('4. Pie and draft', () => (
    <ContentEditor {...actions} parent={page}>
      {[grid, { ...pie, parent_id: grid.id }, { ...draft, parent_id: grid.id }]}
    </ContentEditor>
  ))
  .add('5. Draft and titled pie', () => (
    <ContentEditor {...actions} parent={page}>
      {[
        grid,
        { ...draft, parent_id: grid.id },
        { ...grid, id: 'sub-grid', parent_id: grid.id, body: {} },
        { ...title, parent_id: 'sub-grid' },
        { ...pie, parent_id: 'sub-grid' },
      ]}
    </ContentEditor>
  ))
  .add('6. Barchart', () => (
    <ContentEditor {...actions} parent={page}>
      {[barchart]}
    </ContentEditor>
  ));
