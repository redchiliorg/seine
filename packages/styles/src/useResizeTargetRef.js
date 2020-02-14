// @flow
import * as React from 'react';
import { useAutoEffect } from 'hooks.macro';

import ResizeObserverContext from './ResizeObserverContext';

/**
 * @description Use ref of resize observer target.
 * @returns {React.Ref<HTMLElement>}
 */
export default function useResizeTargetRef() {
  const { observer: resizeObserver } = React.useContext(ResizeObserverContext);

  const resizeTargetRef = React.useRef<HTMLElement>(null);
  const { current: resizeTarget } = resizeTargetRef;

  useAutoEffect(() => {
    const { current: currentResizeTarget } = resizeTargetRef;
    if (resizeTarget !== currentResizeTarget) {
      if (resizeTarget) {
        resizeObserver.unobserve(resizeTarget);
      }
      if (currentResizeTarget) {
        resizeObserver.observe(currentResizeTarget);
      }
    }
  });

  return resizeTargetRef;
}
