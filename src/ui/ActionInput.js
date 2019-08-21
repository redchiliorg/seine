// @flow
import * as React from 'react';

type Action = { type: string, [string]: any };

type Props = {
  action: Action,
  dispatch: (Action) => any,
};

/**
 * @description Declarative action input.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ActionInput({
  action,
  dispatch,
  ...inputProps
}: Props) {
  return (
    <input
      {...inputProps}
      onChange={React.useCallback(
        (event: SyntheticInputEvent) =>
          dispatch({
            ...action,
            data: { [inputProps.name]: event.currentTarget.value },
          }),
        [action, dispatch, inputProps.name]
      )}
    />
  );
}
