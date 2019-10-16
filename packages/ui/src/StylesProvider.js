// @flow
import * as React from 'react';
import {
  createGenerateClassName,
  StylesProvider as MuiStylesProvider,
  useTheme,
} from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

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
  generateClassName = defaultGenerateClassName,
  ...stylesProviderProps
}: Props) {
  const theme = useTheme();
  return (
    <MuiStylesProvider
      {...stylesProviderProps}
      generateClassName={generateClassName}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MuiStylesProvider>
  );
}
