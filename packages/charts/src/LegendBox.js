import styled from 'styled-components';

const LegendBox = styled.div`
  && {
    background-color: ${({ color }) => color};
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    margin-right: 10px;
  }
`;

export default LegendBox;
