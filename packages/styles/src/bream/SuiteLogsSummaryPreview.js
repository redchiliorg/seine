// @flow
import * as React from 'react';

import ThemeProvider from '../ThemeProvider';

import BootstrapContainer from './BootstrapContainer';
import SuiteLogsReviewHeader from './SuiteLogsReviewHeader';
import theme from './theme';

type Props = { [string]: any };

/**
 * @description Public preview of suite log summary.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SuiteLogsSummaryPreview(props: Props) {
  return (
    <ThemeProvider theme={theme}>
      <BootstrapContainer fluid>
        <SuiteLogsReviewHeader {...props} />
      </BootstrapContainer>
    </ThemeProvider>
  );
}
