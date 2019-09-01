// @flow
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';

import { SELECT_BLOCK } from './reducers/content';
import type { BlockId } from './types';

const defaultDevToolsConfig = {};

/**
 * @description Use extended reducer to dispatch changes through redux-devtools.
 * @param {Function} reduce
 * @param {object} initialArg
 * @param {Function} init
 * @param {object} devToolsConfig
 * @returns {[object, Function]}
 */
export function useReducerEx<State, Action>(
  reduce: (State, Action) => State,
  initialArg: State,
  init: (...any) => State,
  devToolsConfig = defaultDevToolsConfig
) {
  // reference to last dispatched action
  const actionRef = useRef<Action>(null);

  const [state, dispatch] = useReducer<State, Action>(reduce, initialArg, init);

  const { current: action } = actionRef;
  const devTools = useMemo(
    () =>
      process.env.NODE_ENV === 'development' &&
      window['__REDUX_DEVTOOLS_EXTENSION__'] &&
      window['__REDUX_DEVTOOLS_EXTENSION__'].connect(devToolsConfig),
    [devToolsConfig]
  );

  useEffect(() => {
    if (devTools) {
      if (action === null) {
        devTools.init(state);
      } else {
        devTools.send(action, state);
      }
    }
  }, [action, devTools, state]);

  return [
    state,
    useCallback((action) => {
      actionRef.current = action;
      dispatch(action);
    }, []),
  ];
}

/**
 *
 * @description Use props of a selectable block container.
 * @param {{id: BlockId, selection: BlockId[]}} blocks
 * @param {Function} dispatch
 * @returns {{onClick: Function, id: BlockId, selection: BlockId[]}}
 */
export function useSelectableBlockContainerProps(
  { id, selection }: { id: BlockId, selection: BlockId[] },
  dispatch
) {
  return {
    id,
    selection,
    onClick: useCallback(
      (event: SyntheticMouseEvent) => {
        event.stopPropagation();
        dispatch({
          type: SELECT_BLOCK,
          id,
          ...(event.shiftKey && { modifier: 'add' }),
        });
      },
      [dispatch, id]
    ),
  };
}
