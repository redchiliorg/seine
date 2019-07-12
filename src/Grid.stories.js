import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Grid from './Grid';

storiesOf('Grid', module).add(
  'div children with default props and no width',
  () => (
    <Grid>
      <div>Block A</div>
      <div>Block B</div>
      <div>Block C</div>
      <div>Block D</div>
    </Grid>
  )
);
