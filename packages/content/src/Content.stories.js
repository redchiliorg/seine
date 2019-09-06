import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  draft,
  pie,
  grid,
  page,
  title,
} from '../../editor/src/ContentEditor.stories';

import Content from './Content';

storiesOf('Content', module)
  .add('1. Draft', () => <Content parent={page}>{[draft]}</Content>)
  .add('2. Pie', () => <Content parent={page}>{[pie]}</Content>)
  .add('3. Pie and draft', () => (
    <Content parent={page}>
      {[
        page,
        { ...grid, parent_id: page.id, body: {} },
        { ...pie, parent_id: grid.id },
        { ...draft, parent_id: grid.id },
      ]}
    </Content>
  ))
  .add('4. Draft and titled pie', () => (
    <Content parent={page}>
      {[
        grid,
        { ...draft, parent_id: grid.id },
        { ...grid, id: 'sub-grid', parent_id: grid.id, body: {} },
        { ...title, parent_id: 'sub-grid' },
        { ...pie, parent_id: 'sub-grid' },
      ]}
    </Content>
  ));
