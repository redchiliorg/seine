// @flow
import { useCallback, useRef, useEffect } from 'react';

import { DESELECT_BLOCK, SELECT_BLOCK } from './reducers/editor';

/**
 * @description Use block selection target props
 *
 * @param {boolean} selected
 * @param {Function} onChange
 * @param {string} id
 * @returns {{onClick: *, id: *, selected: *}}
 */
export function useBlockSelection(
  selected: boolean,
  onChange: Function,
  id: string
) {
  const ref = useRef();
  const onClick = useCallback(
    () => !selected && onChange({ type: SELECT_BLOCK, id }),
    [selected, onChange, id]
  );
  useEventListener('click', (event: SyntheticMouseEvent) => {
    if (
      selected &&
      (!ref.current ||
        (event.target !== ref.current && !ref.current.contains(event.target)))
    ) {
      event.preventDefault();
      onChange({ type: DESELECT_BLOCK, id });
    }
  });
  return { id, onClick, selected, ref };
}

/**
 * @description Use event listener callback (https://usehooks.com/)
 *
 * @param {string} eventName
 * @param {Function} handler
 * @param {Element} element
 */
export function useEventListener(eventName, handler, element = global) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}
