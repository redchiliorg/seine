import defaultMuiTheme from '@material-ui/core/styles/defaultTheme';
import { deepmerge } from '@material-ui/utils';
import { createContentTheme } from '@seine/content';

const defaultTheme = deepmerge(defaultMuiTheme, createContentTheme(), {
  clone: false,
});

export default defaultTheme;
