// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';

const defaultScale = { xScale: 1, yScale: 1 };

/**
 * @description Use scale of an svg element by its reference.
 * @param {{xScale: number, yScale: number}} initialScale
 * @returns {[{xScale: number, yScale: number}, Function]}
 */
export default function useSvgScale(
  initialScale: { xScale: number, yScale: number } = defaultScale
) {
  // use svg and html boxes of an element to determine it's scale factor.
  const svgRef = React.useRef(null);
  const [scale, setScale] = React.useState(initialScale);
  const updateScale = useAutoCallback(() => {
    const { current: foreign } = svgRef;
    const svgBox = foreign && foreign.getBBox();
    const htmlBox = foreign && foreign.getBoundingClientRect();
    setScale(
      svgBox && htmlBox
        ? {
            xScale: svgBox.width / htmlBox.width,
            yScale: svgBox.height / htmlBox.height,
          }
        : initialScale
    );
  });

  // use scale update handler on global resize event
  useAutoEffect(() => {
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
    };
  });

  return [
    scale,
    useAutoCallback((svg) => {
      if (svg) {
        svgRef.current = svg;
        updateScale();
      }
    }),
  ];
}
