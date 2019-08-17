// @flow
import * as React from 'react';

type Value = any;

type Props = {
  value: Value,
  onChange: (value: Value) => any,
};

/**
 * @description Styled toolbar button
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ActionButton({
  value,
  onChange,
  ...buttonProps
}: Props) {
  return (
    <button
      {...buttonProps}
      onClick={React.useCallback(() => onChange(value), [onChange, value])}
    />
  );
}
