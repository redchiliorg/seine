// @flow
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import type { Action, BlockId, State } from '@seine/core';
import { SELECT_BLOCK } from '@seine/core';

const defaultDevToolsConfig = {};

/**
 * @description Use extended reducer to dispatch changes through redux-devtools.
 * @param {Function} reduce
 * @param {object} initialArg
 * @param {Function} init
 * @param {object} devToolsConfig
 * @returns {[object, Function]}
 */
export function useReducerEx<S: State, A: Action>(
  reduce: (S, A) => S,
  initialArg: S,
  init: (...any[]) => S,
  devToolsConfig: { [string]: any } = defaultDevToolsConfig
) {
  // reference to last dispatched action
  const actionRef = useRef<Action | null>(null);

  const [state, dispatch] = useReducer<S, A>(reduce, initialArg, init);

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
    useCallback((action: Action) => {
      actionRef.current = action;
      dispatch(action);
    }, []),
  ];
}

/**
 *
 * @description Use props for a container of selectable content block.
 * @param {{id: BlockId, selection: Array<BlockId>}} blocks
 * @param {Function} dispatch
 * @returns {{onClick: Function, id: BlockId, selection: BlockId[]}}
 */
export function useSelectableBlockProps(
  { id, selection }: { id: BlockId, selection: $ReadOnlyArray<BlockId> },
  dispatch: (Action) => any
) {
  return {
    isSelected: selection.includes(id),
    onClick: useCallback(
      (event: SyntheticMouseEvent<>) => {
        event.stopPropagation();
        dispatch({
          type: SELECT_BLOCK,
          id,
          ...(event.shiftKey ? { modifier: 'add' } : {}),
        });
      },
      [dispatch, id]
    ),
  };
}

/**
 * @description Use xScale and yScale of svg element set by a function
 * @returns {[Function, number, number]}
 */
export function useSvgScaleRef() {
  const [svgElement, setSvgElement] = useState(null);
  const [xScale, yScale] = useMemo(() => {
    if (svgElement) {
      const { a, d } = svgElement.getScreenCTM().inverse();
      return [a, d];
    }
    return [1, 1];
  }, [svgElement]);
  return [[xScale, yScale], setSvgElement];
}
