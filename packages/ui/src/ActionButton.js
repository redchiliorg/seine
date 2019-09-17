// @flow
import * as React from 'react';
import type { Action } from '@seine/core';

import Button from './Button';

type Props = Action & React.ElementProps<HTMLButtonElement>;

/**
 * @description Declarative action button.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ActionButton({
  className,
  children,
  dispatch,
  color,
  title,
  ...action
}: Props) {
  return (
    <Button
      color={color}
      title={title}
      onClick={React.useCallback(() => dispatch(action), [dispatch, action])}
    >
      {children}
    </Button>
  );
}
