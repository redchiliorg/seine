import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { draft, grid, pie, title } from './Content.mocks';
import ContentEditor from './ContentEditor';

storiesOf('ContentEditor', module)
  .add('1. Empty', () => <ContentEditor>{[grid]}</ContentEditor>)
  .add('2. Draft', () => <ContentEditor>{[draft]}</ContentEditor>)
  .add('3. Pie', () => <ContentEditor>{[pie]}</ContentEditor>)
  .add('4. Pie and draft', () => (
    <ContentEditor>
      {[grid, { ...pie, parent_id: grid.id }, { ...draft, parent_id: grid.id }]}
    </ContentEditor>
  ))
  .add('5. Draft and titled pie', () => (
    <ContentEditor>
      {[
        grid,
        { ...draft, parent_id: grid.id },
        { ...grid, id: 'sub-grid', parent_id: grid.id, body: {} },
        { ...title, parent_id: 'sub-grid' },
        { ...pie, parent_id: 'sub-grid' },
      ]}
    </ContentEditor>
  ));
