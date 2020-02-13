// @flow
import * as React from 'react';
import { useAutoLayoutEffect, useAutoMemo } from 'hooks.macro';
import ResizeObserver from 'resize-observer-polyfill';

import ChartResizeContext from './ChartResizeContext';

type Props = {
  children?: any,
};

/**
 * @description Force charts update on resize of each subscribed target.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartResizeProvider({ children = null }: Props) {
  const [count, setCount] = React.useState(0);

  const observer = useAutoMemo(
    new ResizeObserver(() => {
      setCount((n) => (n === Number.MAX_VALUE ? 1 : n + 1));
    })
  );

  useAutoLayoutEffect(() => {
    setCount(1);
  });

  return (
    <ChartResizeContext.Provider value={{ observer, count }}>
      {children}
    </ChartResizeContext.Provider>
  );
}
