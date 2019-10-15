// @flow
import * as React from 'react';
import type { ImageBody, ImageFormat } from '@seine/core';

export type Props = ImageBody & ImageFormat & $Shape<HTMLImageElement>;

/**
 * @description Image block default render component.
 * {Props} props
 * @returns {React.Node}
 */
export default function Image({ as: Img = 'img', align, alt, file }: Props) {
  return <Img alt={alt} align={align} src={file} />;
}
