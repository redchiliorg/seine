import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { blockTypes } from './types';
import Content from './Content';

const gridBlock = {
  id: '1',
  parent_id: null,
  type: blockTypes.GRID,
  data: {},
};
const blocks = [
  {
    id: 'grid-title',
    parent_id: null,
    type: blockTypes.TEXT,
    data: (
      <>
        <h1>Grid block</h1>
        <br />
      </>
    ),
  },
  gridBlock,
  {
    id: 'a',
    parent_id: gridBlock.id,
    type: blockTypes.TEXT,
    data: 'Block A is a text',
  },
  {
    id: 'b',
    parent_id: gridBlock.id,
    type: blockTypes.DRAFT,
    data: {
      entityMap: {},
      contentBlocks: ['Block C is draft.js block'],
    },
  },
  {
    id: 'text-title',
    parent_id: null,
    type: blockTypes.TEXT,
    data: (
      <>
        <h1>
          <br />
          Text block
        </h1>
        <br />
      </>
    ),
  },
  {
    id: 'text',
    parent_id: null,
    type: blockTypes.TEXT,
    data: 'Text block data is a text',
  },
  {
    id: 'draft-title',
    parent_id: null,
    type: blockTypes.TEXT,
    data: (
      <>
        <h1>
          <br />
          Draft.js block
        </h1>
        <br />
      </>
    ),
  },
  {
    id: 'draft',
    parent_id: null,
    type: blockTypes.DRAFT,
    data: {
      entityMap: {},
      contentBlocks: [],
    },
  },
];
const container = 'main';

storiesOf('Content', module).add('default', () => (
  <Content component={container}>{blocks}</Content>
));
