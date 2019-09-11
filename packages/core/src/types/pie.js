// @flow
type Color = string;

export type PieElement = {
  title: string,
  percent: number,
  color: Color,
};

export type PieBody = {
  elements: PieElement[],
  palette: $ReadOnlyArray<Color>,
};

export type PieFormat = {
  innerFontColor: Color,
  outerFontColor: Color,
  size: number,
};

export const PIE = 'pie';
