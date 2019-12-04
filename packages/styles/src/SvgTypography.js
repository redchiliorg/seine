// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { useAutoEffect, useAutoCallback } from 'hooks.macro';
import type { ThemeStyle } from '@material-ui/core/styles/createTypography';

import Typography from './Typography';

const Offscreen = styled.canvas.attrs(
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
  ({ fill }: SvgTypographyProps & BoxProps) => ({ color: fill })
)`
  ${({ xScale, yScale }: SvgTypographyProps & BoxProps) => css`
    transform: scale(${xScale}, ${yScale});
    transform-origin: 1px top;

    overflow: visible;
    white-space: pre;
  `}
`;

const initialSvgTextSize = { width: 0, height: 0 };
const initialSvgTextScale = { xScale: 1, yScale: 1 };

export type Props = {
  children?: string,
  variant?: ThemeStyle,
  x?: number,
  y?: number,
} & SvgTypographyProps;

const ForeignObject = styled('foreignObject')`
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
  x = 0,
  y = 0,
  width,
  textAnchor = 'start',
  ...typography
}: Props) {
  const text = React.Children.toArray(children)
    .map(
      (child) =>
        `${
          typeof child === 'string' || typeof child === 'number'
            ? child
            : child && child.props && 'value' in child.props
            ? child.props.value
            : ''
        }`
    )
    .filter((child) => child)
    .join(' ');
  // use svg and html boxes of foreign object to determine text transform
  const foreignRef = React.useRef(null);
  const [scale, setScale] = React.useState(initialSvgTextScale);
  const updateTransform = useAutoCallback(() => {
    const { current: foreign } = foreignRef;
    const svgBox = foreign && foreign.getBBox();
    const htmlBox = foreign && foreign.getBoundingClientRect();
    setScale(
      svgBox && htmlBox
        ? {
            xScale: svgBox.width / htmlBox.width,
            yScale: svgBox.height / htmlBox.height,
          }
        : initialSvgTextScale
    );
  });

  // use text transform update handler on global resize event
  useAutoEffect(() => {
    window.addEventListener('resize', updateTransform);
    return () => {
      window.removeEventListener('resize', updateTransform);
    };
  });

  // use text size measured by an offscreen canvas context
  const [size, setSize] = React.useState(
    width
      ? { width }
      : width
      ? { ...initialSvgTextSize, width }
      : initialSvgTextSize
  );
  const offscreenRef = React.useRef(null);
  const updateSize = useAutoCallback(() => {
    const { current: offscreen } = offscreenRef;
    if (offscreen) {
      const { fontWeight, fontSize, fontFamily, lineHeight } = getComputedStyle(
        offscreen
      );
      const context = offscreen.getContext('2d');
      context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
      const textMetrics = context.measureText(text);
      setSize({
        width: width ? Math.min(textMetrics.width, width) : textMetrics.width,
        height: parseFloat(lineHeight),
      });
    }
  });

  // use text size update handler on global (font) load event
  useAutoEffect(() => {
    updateSize();
    window.addEventListener('load', updateSize);
    return () => {
      window.removeEventListener('load', updateSize);
    };
  });

  return (
    <ForeignObject
      ref={useAutoCallback((foreign) => {
        foreignRef.current = foreign;
        updateTransform();
      })}
      height={'100%'}
      width={'100%'}
      x={
        x -
        (textAnchor === 'start'
          ? 0
          : (size.width * scale.xScale) / (textAnchor === 'end' ? 1 : 2))
      }
      y={
        y -
        (dominantBaseline === 'hanging'
          ? 0
          : (size.height * scale.yScale) /
            (dominantBaseline === 'baseline' ? 1 : 2))
      }
    >
      <Offscreen ref={offscreenRef} variant={variant} {...size} />
      <StyledTypography variant={variant} {...typography} {...size} {...scale}>
        {children}
      </StyledTypography>
    </ForeignObject>
  );
}
