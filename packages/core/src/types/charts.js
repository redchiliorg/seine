// @flow
export type ChartElement = {
  title: string,
  value: number,
  group: string,
};
export type ChartBody = {
  elements: $ReadOnlyArray<Element>,
};

export type ChartFormat = {
  size: number,
  fontWeight: number,
  lineHeight: number,
  palette: string[],
};

export const BAR_CHART = 'bar-chart';
export const COLUMN_CHART = 'column-chart';
export const PIE_CHART = 'pie-chart';
