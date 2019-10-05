// @flow
import * as React from 'react';
import Paper from '@material-ui/core/Paper';

export default ({ as = 'div', className, classes, ...props }) => (
  <Paper classes={{ ...classes, root: className }} {...props} component={as} />
);
