import * as React from 'react';
import { Editor } from '@seine/editor';
import { actions } from '@storybook/addon-actions';

export default { title: 'Editor' };

export const Empty = () => (
  <Editor
    parent={{
      id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
    {...actions('onChange')}
  />
);
