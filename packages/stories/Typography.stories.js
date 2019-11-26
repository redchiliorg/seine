import * as React from 'react';
import { defaultTheme } from '@seine/content';
import { SvgTypography, Typography } from '@seine/ui';
import { ThemeProvider } from 'styled-components';

export default { title: 'Single.SvgText' };

export const HTMLTextInSVG = ({ children = 'html document text' }) => (
  <ThemeProvider theme={defaultTheme}>
    <Typography width={'100%'}>{children}</Typography>
    <div style={{ width: '100%', fontWeight: 600 }}>
      should be rendered exactly as
    </div>
    <svg height={'100%'} width={'100%'}>
      <SvgTypography>{children}</SvgTypography>
    </svg>
  </ThemeProvider>
);
