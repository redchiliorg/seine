// @flow

export type PieElement = {
  title: string,
  value: number,
  color: Color,
};

export type ChartBody = {
  elements: PieElement[],
  palette: $ReadOnlyArray<Color>,
};

export type ChartFormat = {
  innerFontColor: Color,
  outerFontColor: Color,
  size: number,
};

export const PIE = 'pie';
