// @flow

export opaque type Color = string;

export type PieElement = {
  title: string,
  percent: number,
};

export type PieBody = {
  elements: PieElement[],
};

export type PieFormat = {
  fontSize: number,
  innerFontColor: string,
  outerFontColor: string,
  padding: number,
  palette: Color[],
  size: number,
};

export const PIE = 'pie';
