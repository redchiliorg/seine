// @flow
import type { ChartBody, ChartFormat } from '@seine/core';

export type ChartProps = $Shape<ChartFormat> & ChartBody & { group?: string };
