// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';

/**
 * @description Use text metrics measured by a canvas context.
 * @param {string} text
 * @param {HTMLCanvasElement} canvas
 * @param {number} initialWidth
 * @param {number} initialHeight
 * @returns {[{width: number, height: number}, React.Ref<HTMLCanvasElement>]}
 */
export default function useTextMetrics(
  text: string,
  canvas: HTMLCanvasElement,
  initialWidth = 0,
  initialHeight = 0
) {
  const [metrics, setMetrics] = React.useState({
    height: initialHeight,
    width: initialWidth,
  });
  const updateMetrics = useAutoCallback(() => {
    if (canvas) {
      const { fontWeight, fontSize, fontFamily, lineHeight } = getComputedStyle(
        canvas
      );
      const context = canvas.getContext('2d');
      context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
      const textMetrics = context.measureText(text);
      setMetrics({
        width: initialWidth
          ? Math.min(textMetrics.width, initialWidth)
          : textMetrics.width,
        height: initialHeight || parseFloat(lineHeight),
      });
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

  return metrics;
}
