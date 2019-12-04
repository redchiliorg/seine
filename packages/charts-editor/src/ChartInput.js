// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import type { SvgTypographyProps as Props } from '@seine/styles';
import { SvgTypography } from '@seine/styles';

const Input = styled.input`
  && {
    background: none;
    border: 0;
    color: inherit;
    margin: 0;
    padding: 0;
    font: inherit;
    height: 100%;
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

/**
 * @description Svg foreign input styled according to root html document.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartInput({
  onChange,
  children,
  type,
  as = 'div',
  textAnchor = 'start',
  ...typography
}: Props) {
  const [value, ...suffix] = React.Children.toArray(children);
  return (
    <SvgTypography as={as} textAnchor={textAnchor} {...typography}>
      <Input
        textAnchor={textAnchor}
        value={value}
        {...(type && { type })}
        {...(onChange && { onChange })}
      />
      <span>{suffix}</span>
    </SvgTypography>
  );
}
