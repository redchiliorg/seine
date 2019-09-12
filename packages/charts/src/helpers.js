// @flow
import type { ChartElement } from '@seine/core';

/**
 * @description Convert polar coordinates to cartesian.
 * @param {number} centerX
 * @param {number} centerY
 * @param {number} radius
 * @param {number} angle
 * @returns {[number, number]}
 */
export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number
) {
  return [
    centerX + radius * Math.cos(angle),
    centerY + radius * Math.sin(angle),
  ];
}

/**
 * @description Build svg path of circle segment.
 * @param {number} x coordinate of central point
 * @param {number} y coordinate of central point
 * @param {number} radius of circle
 * @param {number} start of segment in degrees
 * @param {number} end of segment in degrees
 * @returns {string}
 */
export function describeArc(
  x: number,
  y: number,
  radius: number,
  start: number,
  end: number
) {
  const [startX, startY] = polarToCartesian(x, y, radius, end);
  const [endX, endY] = polarToCartesian(x, y, radius, start);

  const arcSweep = end - start <= Math.PI ? '0' : '1';

  return [
    `M ${startX} ${startY}`,
    `A ${radius} ${radius} 0 ${arcSweep} 0 ${endX} ${endY}`,
    `L ${x} ${y}`,
    `L ${startX} ${startY}`,
  ].join(' ');
}

/**
 * @description Group chart elements.
 * @param {Element[]} elements
 * @returns {Element[][]}
 */
export function groupElements(elements: ChartElement[]) {
  return elements.sort(({ group: left }, { group: right }) =>
    right > left ? 1 : right < left ? -1 : 0
  );
}
