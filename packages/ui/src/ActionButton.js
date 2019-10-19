// @flow
import * as React from 'react';
import type { Action } from '@seine/core';
import { Button as MuiButton } from '@material-ui/core';
import {
  CREATE_BLOCK,
  CREATE_BOTTOM_BLOCK,
  CREATE_LEFT_BLOCK,
  CREATE_RIGHT_BLOCK,
  CREATE_TOP_BLOCK,
  SELECT_BLOCK,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';

type Props = Action & React.ElementProps<HTMLButtonElement>;

/**
 * @description Declarative action button.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ActionButton({
  as: Button = MuiButton,
  block,
  body,
  dispatch,
  editor,
  format,
  group,
  id,
  index,
  modifier,
  type,
  ...buttonProps
}: Props) {
  return (
    <Button
      {...buttonProps}
      type={'button'}
      onClick={React.useCallback(
        () =>
          dispatch(
            block &&
              // create block
              (type === CREATE_BLOCK ||
                (id &&
                  (type === CREATE_BOTTOM_BLOCK ||
                    type === CREATE_LEFT_BLOCK ||
                    type === CREATE_RIGHT_BLOCK ||
                    type === CREATE_TOP_BLOCK)))
              ? id
                ? { id, block, type }
                : { block, type }
              : // update block
              body && UPDATE_BLOCK_BODY
              ? { body, type }
              : format && UPDATE_BLOCK_FORMAT
              ? { format, type }
              : editor && UPDATE_BLOCK_EDITOR
              ? { editor, type }
              : // select block
              id && SELECT_BLOCK
              ? modifier
                ? { id, modifier, type }
                : { id, type }
              : // delete or deselect block
                { type }
          ),
        [block, body, dispatch, editor, format, id, modifier, type]
      )}
    />
  );
}
