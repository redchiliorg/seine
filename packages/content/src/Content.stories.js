import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  draft,
  pie,
  grid,
  page,
  title,
  chart,
} from '../../editor/src/ContentEditor.stories';

import Content from './Content';

storiesOf('Content', module)
  .add('1. Draft', () => (
    <div className={'mui-panel'}>
      <Content parent={page}>{[draft]}</Content>
    </div>
  ))
  .add('2. Pie', () => (
    <div className={'mui-panel'}>
      <Content parent={page}>{[pie]}</Content>
    </div>
  ))
  .add('3. Pie and draft', () => (
    <div className={'mui-panel'}>
      <Content parent={page}>
        {[
          page,
          grid,
          { ...pie, parent_id: grid.id },
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
          { ...grid, id: 'sub-grid', parent_id: grid.id, body: {} },
          { ...title, parent_id: 'sub-grid' },
          { ...pie, parent_id: 'sub-grid' },
        ]}
      </Content>
    </div>
  ))
  .add('6. Bar chart', () => (
    <div className={'mui-panel'}>
      <Content parent={page}>
        {[{ ...grid, columns: 'auto' }, { ...chart, parent_id: grid.id }]}
      </Content>
    </div>
  ));
