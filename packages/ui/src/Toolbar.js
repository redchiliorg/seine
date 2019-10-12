// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import MuiAppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import MuiToolbar from '@material-ui/core/Toolbar';

Toolbar.Group = ({ children }) => <>{children}</>;

Toolbar.Separator = styled(({ orientation = 'vertical', ...props }) => (
  <Divider {...props} orientation={orientation} />
))`
  && {
    ${({ theme }) => css`
      margin-left: ${theme.spacing(2)}px;
      margin-right: ${theme.spacing(2)}px;
    `}
  }
`;

const AppBar = styled(MuiAppBar)`
  && {
    background-color: ${({ theme }) =>
      css`
        ${theme.palette.grey[400]}
      `};
  }
`;

type Props = {
  children: React.Node,
};

/**
 * @description Toolbar
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Toolbar(props: Props) {
  return (
    <AppBar position={'relative'}>
      <MuiToolbar
        onClick={React.useCallback((event) => event.stopPropagation(), [])}
        {...props}
      />
    </AppBar>
  );
}
