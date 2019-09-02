// @flow

export type PieElement = {
  title: string,
  percent: number,
  color: string,
};

export type PieBody = {
  elements: PieElement[],
};

export type PieFormat = {
  fontSize: number,
  innerFontColor: string,
  outerFontColor: string,
  padding: number,
  size: number,
};

export const PIE = 'pie';
