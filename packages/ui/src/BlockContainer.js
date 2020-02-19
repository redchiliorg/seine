// @flow
import styled from 'styled-components/macro';

type Props = {
  selected?: boolean,
};

const BlockContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border: ${({ selected = false }: Props) =>
    selected ? '1px dashed blue' : '1px solid transparent'};
`;

export default BlockContainer;
