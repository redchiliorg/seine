// @flow
import styled, { css } from 'styled-components';
import { SvgTypography } from '@seine/styles';

const ColumnChartValue = styled(SvgTypography)`
  ${({ theme: { breakpoints } }) => css`
    ${breakpoints.down('md')} {
      font-size: 0.65rem;
    }
  `}
`;

export default ColumnChartValue;
