// @flow
import * as React from 'react';
import { breamTheme, ThemeProvider } from '@seine/styles';
import { useAutoLayoutEffect } from 'hooks.macro';

import {
  ContentOfPieAndBarSiblingCharts,
  InitialContent,
} from './Content.stories';

import './bream.css';

type Props = {
  children?: any,
};

export default {
  title: 'Bream',
};

export const ThemedInitialContent = ({ children, ...contentProps }: Props) => {
  const [html] = document.children;
  useAutoLayoutEffect(() => {
    html.classList.add('bream');
    return () => {
      html.classList.remove('bream');
    };
  });

  return (
    <ThemeProvider theme={breamTheme}>
      <InitialContent {...contentProps}>{children}</InitialContent>
    </ThemeProvider>
  );
};

export const ThemedContentOfPieAndBarSiblingCharts = ({
  children,
  ...contentProps
}: Props) => (
  <ThemedInitialContent {...contentProps} as={ContentOfPieAndBarSiblingCharts}>
    {children}
  </ThemedInitialContent>
);
