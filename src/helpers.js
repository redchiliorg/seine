// @flow
import { useCallback, useRef, useEffect } from 'react';

import { DESELECT_BLOCK, SELECT_BLOCK } from './reducers/content';

/**
 * @description Use block selection target props
 * @param {string} id
 * @param {Function} dispatch
 * @returns {{onClick: *, id: *, selected: *}}
 */
export function useBlockSelection(id: string, dispatch: Function) {
  const target = useRef();

  const globalClickListener = useCallback(
    (event: SyntheticMouseEvent) => {
      if (dispatch) {
        if (
          target.current &&
          (event.target === target.current ||
            target.current.contains(event.target))
        ) {
          dispatch({ type: SELECT_BLOCK, id });
        } else {
          dispatch({ type: DESELECT_BLOCK, id });
        }
      }
    },
    [dispatch, id]
  );

  useEffect(() => {
    const listener = globalClickListener;
    global.addEventListener('click', listener);
    return () => {
      global.removeEventListener('click', listener);
    };
  }, [globalClickListener]);

  return { id, ref: target };
}
