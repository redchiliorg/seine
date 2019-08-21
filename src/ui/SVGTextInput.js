// @flow
import * as React from 'react';

import type { SVGTextElement } from '../PieSlice';

type Props = {
  children: SVGTextElement,
  size: number,
  overlay: HTMLElement,
  as: React.ComponentType,
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
  const { x, y } = children.getBBox();
  const { width, height } = overlay.getBoundingClientRect();
  return (
    <Input
      {...inputProps}
      style={{
        position: 'absolute',
        left: parseInt((x * width) / size),
        top: parseInt((y * height) / size),
        color: children.getAttribute('fill'),
        fontSize: (children.getAttribute('font-size') * width) / size,
      }}
    />
  );
}
