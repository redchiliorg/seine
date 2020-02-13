// @flow
import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const ChartResizeContext = React.createContext<{
  observer?: ResizeObserver,
  count: number,
}>({ count: 0 });

export default ChartResizeContext;
