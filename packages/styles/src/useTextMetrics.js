// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';

/**
 * @description Use text metrics measured by a canvasElement context.
 * @param {string} text
 * @param {HTMLCanvasElement} canvasElement
 * @param {number} initialWidth
 * @param {number} initialHeight
 * @returns {[{width: number, height: number}, React.Ref<HTMLCanvasElement>]}
 */
export default function useTextMetrics(
  text: string,
  canvasElement: HTMLCanvasElement,
  initialWidth = 1,
  initialHeight = 1
) {
  const [width, setMetricsWidth] = React.useState(initialWidth);
  const [height, setMetricsHeight] = React.useState(initialHeight);
  const updateMetrics = useAutoCallback(() => {
    if (canvasElement) {
      const { fontWeight, fontSize, fontFamily, lineHeight } = getComputedStyle(
        canvasElement
      );
      const context = canvasElement.getContext('2d');
      context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
      const textMetrics = context.measureText(text);
      setMetricsWidth(textMetrics.width);
      setMetricsHeight(parseFloat(lineHeight));
    }
  });

  // use metrics update handler on global (font) load event
  useAutoEffect(() => {
    updateMetrics();
    window.addEventListener('load', updateMetrics);
    return () => {
      window.removeEventListener('load', updateMetrics);
    };
  });

  return [width, height];
}
