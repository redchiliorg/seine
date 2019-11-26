import * as React from 'react';
import { defaultTheme, SvgText, Text } from '@seine/content';
import { ThemeProvider } from 'styled-components';

export default { title: 'Single.SvgText' };

export const HTMLTextInSVG = ({ children = 'html document text' }) => (
  <ThemeProvider theme={defaultTheme}>
    <Text width={'100%'}>{children}</Text>
    <div style={{ width: '100%', fontWeight: 600 }}>
      should be rendered exactly as
    </div>
    <svg height={'100%'} width={'100%'}>
      <SvgText x={0} y={0}>
        {children}
      </SvgText>
    </svg>
  </ThemeProvider>
);
