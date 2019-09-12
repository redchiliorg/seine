import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  barChart,
  draft,
  grid,
  page,
  pieChart,
  title,
} from '../../content/src/Content.stories';

import ContentEditor from './ContentEditor';

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
      {[pieChart]}
    </ContentEditor>
  ))
  .add('4. Pie and draft', () => (
    <ContentEditor {...actions} parent={page}>
      {[
        grid,
        { ...pieChart, parent_id: grid.id },
        { ...draft, parent_id: grid.id },
      ]}
    </ContentEditor>
  ))
  .add('5. Draft and titled pie', () => (
    <ContentEditor {...actions} parent={page}>
      {[
        grid,
        { ...draft, parent_id: grid.id },
        { ...grid, id: 'sub-grid', parent_id: grid.id, body: {} },
        { ...title, parent_id: 'sub-grid' },
        { ...pieChart, parent_id: 'sub-grid' },
      ]}
    </ContentEditor>
  ))
  .add('6. Chart', () => (
    <ContentEditor {...actions} parent={page}>
      {[barChart]}
    </ContentEditor>
  ));
