import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { blockTypes } from './types';
import Content from './Content';

import './index.css';

const grid = {
  id: '1',
  type: blockTypes.GRID,
  data: {
    areas: [['a b b', 'c c d'], ['a b', 'c d'], ['a', 'b', 'c', 'd']],
    columns: [['60px', '0.5fr'], [], ['100px', '1fr', '30px', '30px']],
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

storiesOf('Block', module).add('default', () => (
  <div style={{ width }}>
    <Content>{blocks}</Content>
  </div>
));
