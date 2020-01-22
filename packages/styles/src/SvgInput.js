// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';

import SvgTypography from './SvgTypography';
import type { BoxProps, SvgTypographyProps } from './SvgTypography';
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
    transform: scale(${xScale}, ${yScale});
    transform-origin: left top;

    overflow: visible;
    white-space: pre-wrap;

    text-align: ${({ textAnchor }) =>
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
export default function SvgInput({ children = '', ...typographyProps }: Props) {
  return (
    <SvgTypography {...typographyProps} as={StyledInput}>
      {children}
    </SvgTypography>
  );
}
