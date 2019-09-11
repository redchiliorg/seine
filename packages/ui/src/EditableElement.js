import * as React from 'react';
import { UPDATE_BLOCK_EDITOR } from '@seine/core';

import SVGInput from './SVGInput';

export default React.memo(({ children, dispatch, index, ...props }) => (
  <SVGInput
    {...props}
    onChange={React.useCallback(
      (box) =>
        dispatch({
          type: UPDATE_BLOCK_EDITOR,
          editor: { [index]: box },
        }),
      [dispatch, index]
    )}
  >
    {children}
  </SVGInput>
));
