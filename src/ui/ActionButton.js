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
  ...buttonProps
}: Props) {
  return (
    <Button
      {...buttonProps}
      onClick={React.useCallback(
        (event) => {
          event.stopPropagation();
          dispatch(action);
        },
        [dispatch, action]
      )}
    />
  );
}
