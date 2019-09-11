// @flow
import styled from 'styled-components';

type Props = {
  isSelected?: boolean,
};

export default styled.div`
  position: relative;
  border: ${({ isSelected = false }: Props) =>
    isSelected ? '1px dashed blue' : '1px solid transparent'};
`;
