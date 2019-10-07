// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { useSvgScaleRef } from './hooks';

type Props = {
  color?: string,
  fontSize: number,
  fontWeight?: 'normal' | 'bold',
  height: number,
  lineHeight?: number,
  width?: number,
  x: number,
  y: number,
} & $Shape<HTMLInputElement>;

const Input = styled.input`
  ${({
    align = 'left',
    color,
    fontSize,
    fontWeight = 'normal',
    lineHeight,
    transform,
    transparent,
    width,
  }) => css`
    ${color &&
      css`
        color: ${color};
      `};
    ${transparent &&
      css`
        background: transparent;
      `};
    text-align: ${align};
    border: 0;
    display: block;
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    height: ${lineHeight ? lineHeight * fontSize + fontSize + 'px' : 'auto'};
    position: relative;
    transform: ${transform};
    transform-origin: left top;
    width: ${width ? width + 'px' : 'auto'};
  `}
`;

/**
 * @description SVG foreign object with an input.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ForeignInput({
  fontSize,
  height,
  lineHeight = null,
  transparent = false,
  width = '100%',
  x,
  y,
  ...inputProps
}: Props) {
  const [[xScale, yScale], setSvgElement] = useSvgScaleRef();

  return (
    <foreignObject
      height={height}
      ref={setSvgElement}
      width={width}
      x={x}
      y={y}
    >
      <div xmlns="http://www.w3.org/1999/xhtml">
        <Input
          fontSize={fontSize / yScale}
          lineHeight={lineHeight}
          transform={`scale(${xScale},${yScale})`}
          width={width / xScale}
          transparent={transparent}
          {...inputProps}
        />
      </div>
    </foreignObject>
  );
}
