import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { blockTypes } from './types';
import Content from './Content';

const grid = {
  id: '1',
  parent_id: null,
  type: blockTypes.GRID,
  data: {
    areas: [['a b b', 'c c d'], ['a b', 'c d'], ['a', 'b', 'c', 'd']],
    columns: [['60px', '1fr', '60px'], ['0.75fr', '0.25fr'], ['1fr']],
    rows: [['100px', '1fr']],
  },
};
const blocks = [
  grid,
  {
    id: 'a',
    parent_id: grid.id,
    type: blockTypes.TEXT,
    data: { text: 'Block A is a text' },
  },
  {
    id: 'b',
    parent_id: grid.id,
    type: blockTypes.TEXT,
    data: { text: 'Block B is a text' },
  },
  {
    id: 'c',
    parent_id: grid.id,
    type: blockTypes.TEXT,
    data: { text: 'Block C is a text' },
  },
  {
    id: 'd',
    parent_id: grid.id,
    type: blockTypes.TEXT,
    data: { text: 'Block D is a text' },
  },
];
const width = '50%';
const breakpoints = ['lg', 'md', 'sm'];
const container = 'main';

storiesOf('Content', module)
  .add('lg', () => (
    <div style={{ width }}>
      <Content
        breakpoints={breakpoints}
        breakpointId={'lg'}
        component={container}
      >
        {blocks}
      </Content>
    </div>
  ))
  .add('md', () => (
    <div style={{ width }}>
      <Content
        breakpoints={breakpoints}
        breakpointId={'md'}
        component={container}
      >
        {blocks}
      </Content>
    </div>
  ))
  .add('sm', () => (
    <div style={{ width }}>
      <Content
        breakpoints={breakpoints}
        breakpointId={'sm'}
        component={container}
      >
        {blocks}
      </Content>
    </div>
  ));
