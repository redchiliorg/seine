// @flow
import * as React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const Container = styled(Paper)`
  && {
    background-color: #c8c8c8;
    margin-bottom: 0;
    display: flex;
    padding: 0 1em;
  }
`;

Toolbar.Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

Toolbar.Separator = styled.div`
  border-right: 1px solid white;
  border-left: 1px solid gray;
  width: 2px;
  margin: 0.5em;
  opacity: ${({ transparent = false }) => (transparent ? 0 : 1.0)};
`;

/**
 * @description Toolbar
 * @param {any} props
 * @returns {React.Node}
 */
export default function Toolbar(props: any) {
  return (
    <Container
      onClick={React.useCallback((event) => event.stopPropagation(), [])}
      {...props}
    />
  );
}
