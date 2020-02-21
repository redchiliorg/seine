// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';

import InlineInput from './InlineInput';

type Props = {
  children?: any,
};

/**
 * @description Svg foreign input styled according to root html document.
 * @param {Props} props
 * @returns {React.Node}
 */
const SvgInput = React.forwardRef(function SvgInput(
  { value, onChange, type = 'text', ...typographyProps }: Props,
  ref
) {
  return (
    <SvgTypography {...typographyProps} ref={ref}>
      <InlineInput type={type} value={value} onChange={onChange} />
    </SvgTypography>
  );
});

export default SvgInput;
