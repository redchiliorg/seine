// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import type { ThemeStyle } from '@material-ui/core/styles/createTypography';

import Typography from './Typography';
import useSvgScale from './useSvgScale';
import useTextMetrics from './useTextMetrics';

export const Canvas = styled.canvas.attrs(
  ({
    variant = 'body1',
    theme: {
      typography: {
        [variant]: { fontSize, lineHeight },
      },
    },
    height = '100%',
    width = '100%',
  }) => ({
    fontSize,
    height,
    lineHeight,
    width,
  })
)`
  position: absolute;
  z-index: -1;

  ${({ fontSize, lineHeight }) => css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `}

  ${({ height = '100%', width = '100%' }) => css`
    height: ${height};
    width: ${width};
  `}
`;

type SvgTypographyProps = {
  fill?: string,
  textAnchor?: 'start' | 'middle' | 'end',
  dominantBaseline?: 'middle' | 'baseline' | 'hanging',
};

type BoxProps = {
  xScale: number,
  yScale: number,
  height: number,
  width: number,
};

const StyledTypography = styled(Typography).attrs(
  ({ fill }: SvgTypographyProps & BoxProps) => ({
    color: fill,
  })
)`
  ${({ xScale, yScale }: SvgTypographyProps & BoxProps) => css`
    transform: scale(${xScale}, ${yScale});
    transform-origin: 1px top;
    white-space: pre-line;
  `}
`;

export type Props = {
  children?: string,
  variant?: ThemeStyle,
  x?: number,
  y?: number,
} & SvgTypographyProps;

export const ForeignObject = styled.foreignObject`
  && {
    pointer-events: none;
  }
  p,
  input {
    pointer-events: all;
  }
`;

/**
 * @description Svg foreign text styled according to root html document.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SvgTypography({
  children,
  dominantBaseline = 'baseline',
  variant = 'body1',
  height = 0,
  width = 0,
  x = 0,
  y = 0,
  textAnchor = 'start',
  ...typography
}: Props) {
  const [xScale, yScale, svgRef] = useSvgScale();

  const canvasRef = React.useRef(null);
  const { current: canvas } = canvasRef;
  const [textWidth, textHeight] = useTextMetrics(
    React.Children.toArray(children)
      .map(
        (child) =>
          `${
            typeof child === 'string' || typeof child === 'number'
              ? child
              : child && child.props && 'value' in child.props
              ? child.props.value
              : child &&
                child.props.children &&
                (typeof child.props.children === 'string' ||
                  typeof child.props.children == 'number')
              ? child.props.children
              : ''
          }`
      )
      .filter((child) => child)
      .join(' '),
    canvas,
    width,
    height
  );

  return (
    <ForeignObject
      ref={svgRef}
      height={'100%'}
      width={'100%'}
      x={
        x -
        (textAnchor === 'start'
          ? 0
          : (textWidth * xScale) / (textAnchor === 'end' ? 1 : 2))
      }
      y={
        y -
        (dominantBaseline === 'hanging'
          ? 0
          : (textHeight * yScale) / (dominantBaseline === 'baseline' ? 1 : 2))
      }
    >
      <Canvas
        ref={canvasRef}
        variant={variant}
        width={textWidth}
        height={textHeight}
      />
      <StyledTypography
        variant={variant}
        {...typography}
        width={textWidth}
        height={textHeight}
        yScale={yScale}
        xScale={xScale}
      >
        {children}
      </StyledTypography>
    </ForeignObject>
  );
}
