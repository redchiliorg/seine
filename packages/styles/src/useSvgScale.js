// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';

/**
 * @description Use scale of an svg element by its reference.
 * @param {?number} initialXScale
 * @param {?number} initialYScale
 * @returns {[number, number, Function]}
 */
export default function useSvgScale(initialXScale = 1, initialYScale = 1) {
  // use svg and html boxes of an element to determine it's scale factor.
  const svgRef = React.useRef(null);
  const [xScale, setXScale] = React.useState(initialXScale);
  const [yScale, setYScale] = React.useState(initialYScale);
  const updateScale = useAutoCallback(() => {
    const { current: svgElement } = svgRef;
    const svgBox = svgElement && svgElement.getBBox();
    const htmlBox = svgElement && svgElement.getBoundingClientRect();
    if (svgBox && htmlBox) {
      setXScale(svgBox.width / htmlBox.width);
      setYScale(svgBox.height / htmlBox.height);
    }
  });

  // use scale update handler on global resize event
  useAutoEffect(() => {
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
    };
  });

  return [
    xScale,
    yScale,
    useAutoCallback((svg) => {
      if (svg) {
        svgRef.current = svg;
        updateScale();
      }
    }),
  ];
}
