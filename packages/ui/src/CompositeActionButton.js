// @flow
import * as React from 'react';

import Button from './Button';

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
  dispatch,
  type = 'button',
  ...buttonProps
}: Props) {
  return (
    <Button
      {...buttonProps}
      size={'small'}
      type={type}
      onClick={React.useCallback(() => actions.forEach(dispatch), [
        dispatch,
        actions,
      ])}
    />
  );
}
