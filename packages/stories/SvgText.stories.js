import * as React from 'react';
import { defaultTheme, SvgText, Text } from '@seine/content';
import { ThemeProvider } from 'styled-components';

export default { title: 'Single.SvgText' };

export const HTMLTextInSVG = ({ children = 'HTML text in SVG' }) => (
  <ThemeProvider theme={defaultTheme}>
    <Text>{children}</Text>
    <svg viewBox={'0 0 100 100'} height={'50%'} width={'100%'}>
      <SvgText x={0} y={0}>
        {children}
      </SvgText>
    </svg>
  </ThemeProvider>
);
