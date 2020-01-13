import * as React from 'react';
import { defaultTheme, SvgTypography, Typography } from '@seine/styles';
import { ThemeProvider } from 'styled-components/macro';

export default { title: 'Cypress' };

export const SvgTypographyText = () => (
  <ThemeProvider theme={defaultTheme}>
    <div>
      <Typography inline>Text</Typography>
      <div style={{ width: '100%', fontWeight: 600 }}>
        should be rendered exactly as
      </div>
      <svg height={'100%'} width={'100%'}>
        <SvgTypography dominantBaseline={'hanging'}>Text</SvgTypography>
      </svg>
    </div>
  </ThemeProvider>
);
