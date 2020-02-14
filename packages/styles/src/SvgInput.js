// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import type { BoxProps, SvgTypographyProps } from './SvgTypography';
import SvgTypography from './SvgTypography';
import Input from './Input';
import useTypographyChildren from './useTypographyChildren';

type Props = {
  children?: any,
};

const StyledInput = styled(Input).attrs(
  ({ fill, xScale, yScale }: SvgTypographyProps & BoxProps) => ({
    color: fill,
    transform: `scale(${xScale}, ${yScale})`,
  })
)`
  && {
    background: none;
    border: none;
    margin: 0;
    padding: 0;

    ${({ color }) => color && { color }};
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    word-spacing: inherit;

    transform-origin: left top;
    overflow: visible;
    white-space: pre-wrap;
    ${({ transform }) => transform && { transform }};
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

  text-align: ${({ textAnchor = 'start' }) =>
    textAnchor === 'start'
      ? 'left'
      : textAnchor === 'middle'
      ? 'center'
      : 'right'};
`;

/**
 * @description Svg foreign input styled according to root html document.
 * @param {Props} props
 * @returns {React.Node}
 */
export default React.forwardRef(function SvgInput(
  { children = '', ...typographyProps }: Props,
  ref
) {
  const value = useTypographyChildren(children)
    .split(' ')[0]
    .trim();
  return (
    <SvgTypography
      {...typographyProps}
      ref={ref}
      as={StyledInput}
      value={value}
    >
      {children}
    </SvgTypography>
  );
});
