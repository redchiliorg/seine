// @flow
import React from 'react';
import { breamTheme, ThemeProvider } from '@seine/styles';

import {
  ContentOfPieAndBarSiblingCharts,
  InitialContent,
} from './Content.stories';
import useBreamStoryEffect from './useBreamStoryEffect';

import './bream.css';

type Props = {
  children?: any,
};

export default {
  title: 'Bream',
};

export const ThemedInitialContent = ({ children, ...contentProps }: Props) => {
  useBreamStoryEffect(...document.children);

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
