// @flow
export const CHART = 'chart';
export const chartTypes = {
  BAR: 'bar',
  COLUMN: 'column',
  PIE: 'pie',
  LINE: 'line',
};

export type ChartType = $Keys<typeof chartTypes>;

export type ChartFormat = {
  dx: number,
  dy: number,
  kind: ChartType,
  fontSize: number,
  fontWeight: number,
  lineHeight: number,
  minValue: number,
  maxValue: number,
  palette: string[],
  units: string,
  xAxis: boolean,
  yAxis: boolean,
};

export type ChartElement = {
  id: string,
  group: string,
  title: string,
  value: number,
};
export type ChartBody = {
  elements: $ReadOnlyArray<ChartElement>,
  title: string,
};
