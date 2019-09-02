// @flow
import * as React from 'react';
import type { SVGTextElement } from '@seine/pie';

type Props = {
  children: SVGTextElement,
  size: number,
  overlay: HTMLElement | null,
  as: React.ComponentType<any>,
};

/**
 * @description Input element for an overlay to edit svg text child.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SVGTextInput({
  children,
  size,
  overlay,
  as: Input,
  ...inputProps
}: Props) {
  const { x, y, width: w, height: h } = children.getBBox();
  const { width = w, height = h } = overlay
    ? overlay.getBoundingClientRect()
    : {};
  return (
    <Input
      {...inputProps}
      style={{
        position: 'absolute',
        left: parseInt((x * width) / size),
        top: parseInt((y * height) / size),
        width: parseInt((w * width) / size),
        color: children.getAttribute('fill'),
        fontSize: parseInt(h),
      }}
    />
  );
}
