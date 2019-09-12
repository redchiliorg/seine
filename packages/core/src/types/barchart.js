// @flow
type Color = string;

export type ChartElement = {
  title: string,
  percent: number,
  color: Color,
};

export type ChartBody = {
  elements: ChartElement[],
};

export type ChartFormat = {
  size: number,
  fontWeight: number,
  lineHeight: number,
  palette: Color[],
};

export const BARCHART = 'chart';
