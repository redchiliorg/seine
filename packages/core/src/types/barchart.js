// @flow
type Color = string;

export type BarchartElement = {
  title: string,
  percent: number,
  color: Color,
};

export type BarchartBody = {
  elements: BarchartElement[],
};

export type BarchartFormat = {
  size: number,
  fontWeight: number,
  lineHeight: number,
  palette: Color[],
};

export const BARCHART = 'barchart';
