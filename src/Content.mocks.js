import { blockTypes } from './types';
import { toRawContent } from './Draft.helpers';

export const page = {
  id: 'root',
  parent_id: null,
  type: blockTypes.PAGE,
};

export const title = {
  id: 'title',
  parent_id: page.id,
  type: blockTypes.DRAFT,
  body: toRawContent('<h2>V2. London income - Year 8 - 3,400,000</h2>'),
  format: {
    textAlignment: 'center',
  },
};

export const grid = {
  id: 'grid',
  parent_id: null,
  type: blockTypes.GRID,
  body: {},
  format: {
    columns: 'repeat(auto-fit, minmax(300px, 1fr))',
  },
};

export const pie = {
  id: 'pie',
  parent_id: null,
  type: blockTypes.PIE,
  body: {
    elements: [
      { title: 'repairs', percent: 12, color: '#653867' },
      { title: 'consulting', percent: 10, color: '#e5002d' },
      { title: 'training', percent: 8, color: '#f80048' },
      { title: 'product sales', percent: 64, color: '#ff3d69' },
      { title: 'others', percent: 6, color: '#ff6d8c' },
    ],
  },
  format: {
    fontSize: 14,
    padding: 60,
  },
};

export const draft = {
  id: 'draft',
  parent_id: null,
  type: blockTypes.DRAFT,
  body: toRawContent(
    'This block is draft.js content. Click here to edit the text.' +
      '\n\n' +
      'We are planning to add text formatting toolbar soon.' +
      '\n\n' +
      'Draft.js is a framework for building rich text editors in React,\n' +
      'powered by an immutable model and abstracting over cross-browser ' +
      'differences.'
  ),
  format: {
    verticalAlignment: 'center',
  },
};
