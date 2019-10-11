// @flow

export type ImageBody = {
  alt: string,
  file: string,
};

export type ImageFormat = {
  align: 'top' | 'bottom' | 'middle' | 'left' | 'right',
};

export const IMAGE = 'image';
