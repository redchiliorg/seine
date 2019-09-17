// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  fontSize: number,
  height: number,
  lineHeight: number,
  width: number,
  x: number,
  y: number,
} & $Shape<HTMLInputElement>;

const Input = styled.input`
  ${({ fontSize, lineHeight, transform }) => css`
    border: 0;
    display: block;
    font-size: ${Math.floor(fontSize)}px;
    height: ${lineHeight * fontSize + fontSize}px;
    position: relative;
    transform: ${transform};
    transform-origin: left top;
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
  lineHeight,
  width,
  x,
  y,
  ...inputProps
}: Props) {
  const [svgElement, setSvgElement] = React.useState(null);
  const [xScale, yScale] = React.useMemo(() => {
    if (svgElement) {
      const { a, d } = svgElement.getScreenCTM().inverse();
      return [a, d];
    }
    return [1, 1];
  }, [svgElement]);

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
          {...inputProps}
        />
      </div>
    </foreignObject>
  );
}
