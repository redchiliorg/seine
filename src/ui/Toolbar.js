// @flow
import styled from 'styled-components';

import ActionButton from './ActionButton';
import Paper from './Paper';

const Toolbar = styled(Paper)`
  border-radius: 2px;
  display: flex;
  background-color: darkgray;
  transition: opacity 0.15s;
  padding: 1em 1em calc(1em + 5px);
`;

Toolbar.Group = styled.div`
  padding: 0.25em 1rem;
  display: flex;
  flex-wrap: wrap;
`;

Toolbar.Label = styled.label`
  font-weight: 600;
  margin-right: 0.5em;
  align-self: center;
`;

Toolbar.ActionButton = styled(ActionButton)`
  margin: 0.25em 0;
  flex-grow: 0.25;
  :not(:last-child) {
    margin-right: 0.5em;
  }
`;

export default Toolbar;
