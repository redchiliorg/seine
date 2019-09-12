// @flow
export const CHART = 'chart';
export const chartTypes = {
  BAR: 'bar',
  COLUMN: 'column',
  PIE: 'pie',
};

export type ChartType = $Keys<typeof chartTypes>;

export type ChartFormat = {
  kind: ChartType,
  fontWeight: number,
  lineHeight: number,
  palette: string[],
  size: number,
};

export type ChartElement = {
  title: string,
  value: number,
  group: string,
};
export type ChartBody = {
  elements: $ReadOnlyArray<Element>,
};
