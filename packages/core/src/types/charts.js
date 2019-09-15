// @flow
export const CHART = 'chart';
export const chartTypes = {
  BAR: 'bar',
  COLUMN: 'column',
  PIE: 'pie',
};

export type ChartType = $Keys<typeof chartTypes>;

export type ChartFormat = {
  dx: number,
  dy: number,
  kind: ChartType,
  fontSize: number,
  fontWeight: number,
  lineHeight: number,
  palette: string[],
  units: string,
};

export type ChartElement = {
  group: string,
  title: string,
  value: number,
};
export type ChartBody = {
  elements: $ReadOnlyArray<Element>,
  minValue: number,
  maxValue: number,
  title: string,
};
