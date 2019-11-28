import defaultMuiTheme from '@material-ui/core/styles/defaultTheme';
import { deepmerge } from '@material-ui/utils';
import { createTheme } from '@seine/styles';

const defaultTheme = deepmerge(defaultMuiTheme, createTheme(), {
  clone: false,
});

export default defaultTheme;
