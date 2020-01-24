// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';

import type { BoxProps, SvgTypographyProps } from './SvgTypography';
import SvgTypography from './SvgTypography';
import Input from './Input';

type Props = {
  children?: any,
};

const StyledInput = styled(Input).attrs(
  ({ fill }: SvgTypographyProps & BoxProps) => ({
    color: fill,
  })
)`
  ${({ xScale, yScale }: SvgTypographyProps & BoxProps) => css`
    && {
      background: none;
      border: 0;
      margin: 0;
      padding: 0;
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
    transform: scale(${xScale}, ${yScale});
    transform-origin: left top;

    overflow: visible;
    white-space: pre-wrap;

    text-align: ${({ textAnchor = 'start' }) =>
      textAnchor === 'start'
        ? 'left'
        : textAnchor === 'middle'
        ? 'center'
        : 'right'};
  `}
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
  return (
    <SvgTypography {...typographyProps} ref={ref} as={StyledInput}>
      {children}
    </SvgTypography>
  );
});
