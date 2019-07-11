import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Grid from './Grid';

const border = '1px solid red';
const width = '50%';

storiesOf('Grid', module).add('A-B-C-D children with default props', () => (
  <div style={{ width }}>
    <Grid
      areas={[['a b b', 'c c d'], ['a b', 'c d'], ['a', 'b', 'c', 'd']]}
      columns={[['60px', '0.5fr'], [], ['100px', '1fr', '30px', '30px']]}
      rows={[['100px', '1fr']]}
    >
      <div style={{ border, gridArea: 'a' }}>Block A</div>
      <div style={{ border, gridArea: 'b' }}>Block B</div>
      <div style={{ border, gridArea: 'c' }}>Block C</div>
      <div style={{ border, gridArea: 'd' }}>Block D</div>
    </Grid>
  </div>
));
