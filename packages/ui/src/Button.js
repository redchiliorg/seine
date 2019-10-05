// @flow
import * as React from 'react';
import Button from '@material-ui/core/Button';

export default ({ as = 'button', className, classes, ...props }) => (
  <Button classes={{ ...classes, root: className }} {...props} component={as} />
);
