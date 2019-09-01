// @flow
import * as React from 'react';

import Button from './Button';

type Action = { type: string, [string]: any };

type Props = {
  action: Action,
  dispatch: (Action) => any,
};

/**
 * @description Declarative action button.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ActionButton({
  action,
  dispatch,
  type = 'button',
  ...buttonProps
}: Props) {
  return (
    <Button
      {...buttonProps}
      type={type}
      onClick={React.useCallback(() => dispatch(action), [dispatch, action])}
    />
  );
}
