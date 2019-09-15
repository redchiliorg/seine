// @flow
import {
  append,
  ascend,
  converge,
  filter,
  groupBy,
  has,
  map,
  of,
  pipe,
  prepend,
  prop,
  reject,
  sortWith,
  toPairs,
  uniq,
} from 'ramda';
import type { ChartElement } from '@seine/core';
import { useMemo } from 'react';

/**
 * @function
 * @param {ChartElement[]} elements
 * @returns {[?string, ChartElement[]][]}
 */
export const groupElements: (
  elements: ChartElement[]
) => $ReadOnlyArray<[?string, ChartElement[]]> = pipe(
  sortWith([
    /* ascending sort by group */
    ascend(prop('group')),
    /* ascending sort by value */
    ascend(prop('value')),
  ]),

  converge(append, [
    /* take [null, elements] for ungrouped elements */
    pipe(
      reject(has('group')),
      of,
      prepend(null)
    ),

    /* and [group, elements] for others */
    pipe(
      filter(has('group')),
      groupBy(prop('group')),
      toPairs
    ),
  ]),

  reject(([_, { length }]) => length === 0)
);

/**
 * @function
 * @param {ChartElement[]} elements
 * @returns {string[]}
 */
export const uniqElementTitles: (
  elements: ChartElement[]
) => $ReadOnlyArray<string> = pipe(
  filter(has('group')),
  map(prop('title')),
  uniq
);

/**
 * @description Use format of chart element.
 * @param {number} fontSize
 * @param {number} lineHeight
 * @returns {object}
 */
export function useChartFormat(fontSize: number, lineHeight: number) {
  return useMemo(() => {
    return {
      barHeight: fontSize * 6,
      fontHeight: fontSize * lineHeight,
      fontWidth: fontSize / 2,
      textPadding: fontSize,
    };
  }, [fontSize, lineHeight]);
}
