// @flow
import * as React from 'react';
import {
  useTheme,
  StylesProvider as MuiStylesProvider,
  jssPreset,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { create } from 'jss';

export const defaultJSS = create(jssPreset());
export const defaultGenerateClassName = createGenerateClassName({
  seed: '@seine/ui',
});

type Props = React.ComponentProps<typeof MuiStylesProvider>;

/**
 * @description Default styles provider
 * @param {Props} props
 * @returns {React.Node}
 */
export default function StylesProvider({
  children,
  jss = defaultJSS,
  generateClassName = defaultGenerateClassName,
  ...stylesProviderProps
}: Props) {
  const theme = useTheme();
  return (
    <MuiStylesProvider
      jss={jss}
      generateClassName={generateClassName}
      {...stylesProviderProps}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MuiStylesProvider>
  );
}
