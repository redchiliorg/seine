// @flow
import styled from 'styled-components/macro';
import { Fab as MuiFab } from '@material-ui/core';

export default styled(MuiFab)`
  && {
    margin: ${({ theme }) => theme.spacing(4)};
    opacity: 0.75;
    transition: all 0.1s;
    :hover {
      opacity: inherit;
    }
  }
`;
