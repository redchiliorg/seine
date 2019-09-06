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
      { title: 'repairs', percent: 12, color: '#653867' },
      { title: 'consulting', percent: 10, color: '#e5002d' },
      { title: 'training', percent: 8, color: '#f80048' },
      { title: 'product sales', percent: 64, color: '#ff3d69' },
      { title: 'others', percent: 6, color: '#ff6d8c' },
    ],
  },
  { fontSize: 14, padding: 60 },
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
  ));
