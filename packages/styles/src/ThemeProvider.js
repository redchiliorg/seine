// @flow
import * as React from 'react';
import {
  ThemeContext,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components/macro';

import defaultTheme from './defaultTheme';

type Props = {
  children: React.Node,
  theme?: any,
};

/**
 * @description Provide a default for an empty theme context.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ThemeProvider({
  children,
  theme = defaultTheme,
}: Props) {
  return React.useContext(ThemeContext) ? (
    children
  ) : (
    <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
  );
}
