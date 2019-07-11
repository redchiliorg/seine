import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { blockTypes } from './types';
import Content from './Content';

const gridBlock = {
  id: '1',
  parent_id: null,
  type: blockTypes.GRID,
  data: {
    areas: [['a b b', 'c c d'], ['a b', 'c d'], ['a', 'b', 'c', 'd']],
    columns: [['60px', '1fr', '60px'], ['0.75fr', '0.25fr'], ['1fr']],
    rows: [['auto', '1fr']],
  },
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
    id: 'c',
    parent_id: gridBlock.id,
    type: blockTypes.TEXT,
    data: 'Block B is a text',
  },
  {
    id: 'd',
    parent_id: gridBlock.id,
    type: blockTypes.TEXT,
    data: 'Block D is a text',
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
const breakpoints = ['lg', 'md', 'sm'];
const container = 'main';

storiesOf('Content', module)
  .add('lg', () => (
    <Content
      breakpoints={breakpoints}
      breakpointId={'lg'}
      component={container}
    >
      {blocks}
    </Content>
  ))
  .add('md', () => (
    <Content
      breakpoints={breakpoints}
      breakpointId={'md'}
      component={container}
    >
      {blocks}
    </Content>
  ))
  .add('sm', () => (
    <Content
      breakpoints={breakpoints}
      breakpointId={'sm'}
      component={container}
    >
      {blocks}
    </Content>
  ));
