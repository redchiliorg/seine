import { useMemo } from 'react';

/**
 * @description Use bar elements format
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
      textPadding: 2,
    };
  }, [fontSize, lineHeight]);
}
