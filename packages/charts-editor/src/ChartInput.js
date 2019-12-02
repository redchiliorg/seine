// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
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
    height: calc(1em + 2px);
    width: 50%;

    ${({ textAnchor }: Props) => css`
    display: flex;
    ${textAnchor === 'end' &&
      css`
        text-align: left;
      `}
    ${textAnchor === 'middle' &&
      css`
        text-align: center;
      `}
    ${textAnchor === 'start' &&
      css`
        text-align: right;
      `}
  `}
  }
  &[type='number'] {
    -moz-appearance: textfield;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
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
  value,
  type,
  as = 'div',
  textAnchor = 'start',
  ...typography
}: Props) {
  return (
    <SvgTypography as={as} textAnchor={textAnchor} {...typography}>
      <Input
        textAnchor={textAnchor}
        value={value}
        {...(type && { type })}
        {...(onChange && { onChange })}
      />
    </SvgTypography>
  );
}
