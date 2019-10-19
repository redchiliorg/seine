// @flow
import styled from 'styled-components/macro';

type Props = {
  isSelected?: boolean,
};

export default styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border: ${({ isSelected = false }: Props) =>
    isSelected ? '1px dashed blue' : '1px solid transparent'};
`;
