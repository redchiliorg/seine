import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { mocks } from '@seine/core';
import { toRawContent } from '@seine/draft';

import Content from './Content';

const { grid, pie, page } = mocks;
const draft = { ...mocks.draft, body: toRawContent(mocks.draft.body) };
const title = { ...mocks.title, body: toRawContent(mocks.title.body) };

storiesOf('Content', module)
  .add('1. Draft', () => <Content>{[draft]}</Content>)
  .add('2. Pie', () => <Content>{[pie]}</Content>)
  .add('3. Pie and draft', () => (
    <Content>
      {[
        page,
        { ...grid, parent_id: page.id, body: {} },
        { ...pie, parent_id: grid.id },
        { ...draft, parent_id: grid.id },
      ]}
    </Content>
  ))
  .add('4. Draft and titled pie', () => (
    <Content>
      {[
        page,
        { ...grid, parent_id: page.id, body: {} },
        { ...draft, parent_id: grid.id },
        { ...grid, id: 'sub-grid', parent_id: grid.id },
        { ...title, parent_id: 'sub-grid' },
        { ...pie, parent_id: 'sub-grid' },
      ]}
    </Content>
  ));
