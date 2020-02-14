// @flow
import styled from 'styled-components/macro';

const ChartInlineInput = styled.input`
  && {
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: inherit;
    margin: 0;
    padding: 0;
    text-align: ${({ textAlignment = 'inherit' }) => textAlignment};
    width: 100%;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
  &:invalid {
    box-shadow: none;
  }
  :-moz-submit-invalid {
    box-shadow: none;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  &:focus {
    outline: none;
  }
`;

export default ChartInlineInput;
