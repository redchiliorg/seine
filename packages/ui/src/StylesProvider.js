// @flow
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  jssPreset,
  useTheme,
  createGenerateClassName,
  StylesProvider as MuiStylesProvider,
} from '@material-ui/core/styles';

export const defaultGenerateClassName = createGenerateClassName({
  seed: '@seine/ui',
});

const defaultJss = jssPreset();

type Props = React.ComponentProps<typeof MuiStylesProvider>;

/**
 * @description Default styles provider
 * @param {Props} props
 * @returns {React.Node}
 */
export default function StylesProvider({
  children,
  generateClassName = defaultGenerateClassName,
  jss = defaultJss,
  ...stylesProviderProps
}: Props) {
  return (
    <MuiStylesProvider
      {...stylesProviderProps}
      generateClassName={generateClassName}
    >
      <ThemeProvider theme={useTheme()}>{children}</ThemeProvider>
    </MuiStylesProvider>
  );
}
