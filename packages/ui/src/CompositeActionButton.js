// @flow
import * as React from 'react';
import { Button as MuiButton } from '@material-ui/core';

type Action = { type: string, [string]: any };

type Props = {
  actions: Action[],
  dispatch: (Action) => any,
};

/**
 * @description Declarative action button.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function CompositeActionButton({
  actions,
  as: Button = MuiButton,
  dispatch,
  fullWidth = false,
  color = 'default',
  size = 'small',
  variant = 'contained',
  type = 'button',
  ...buttonProps
}: Props) {
  return (
    <Button
      {...buttonProps}
      color={color}
      fullWidth={fullWidth}
      onClick={React.useCallback(() => actions.forEach(dispatch), [
        dispatch,
        actions,
      ])}
      size={size}
      type={type}
      variant={variant}
    />
  );
}
