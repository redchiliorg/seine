import defaultMuiTheme from '@material-ui/core/styles/defaultTheme';
import { createTheme, deepmerge } from '@seine/styles';

const defaultTheme = deepmerge(defaultMuiTheme, createTheme(), {
  clone: false,
});

export default defaultTheme;
