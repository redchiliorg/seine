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
  name,
  type = 'text',
  ...inputProps
}: Props) {
  return (
    <input
      {...inputProps}
      name={name}
      type={type}
      onChange={React.useCallback(
        ({ currentTarget: { value } }: SyntheticInputEvent) =>
          dispatch({
            ...action,
            body: {
              [name]: type === 'number' ? +value : value,
            },
          }),
        [action, dispatch, name, type]
      )}
    />
  );
}
