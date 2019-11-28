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
  }) => ({
    fontSize,
    lineHeight,
  })
)`
  position: absolute;
  height: 100%;
  width: 100%;
  ${({ fontSize, lineHeight }) => css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
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
  ({
    fill,
    height,
    textAnchor = 'start',
    dominantBaseline = 'baseline',
    width,
  }: SvgTypographyProps & BoxProps) => ({
    color: fill,
    height: typeof height === 'number' ? 2 * height : height,
    width: typeof width === 'number' ? 2 * width : width,
    textAnchor,
    dominantBaseline,
  })
)`
  ${({
    dominantBaseline,
    textAnchor,
    xScale,
    yScale,
  }: SvgTypographyProps & BoxProps) => css`
    display: flex;
    ${textAnchor === 'start' &&
      css`
        justify-content: start;
      `}
    ${textAnchor === 'middle' &&
      css`
        justify-content: center;
      `}
    ${textAnchor === 'end' &&
      css`
        justify-content: end;
      `}
    ${dominantBaseline === 'baseline' &&
      css`
        align-items: start;
      `}
    ${dominantBaseline === 'middle' &&
      css`
        align-items: center;
      `}
    ${dominantBaseline === 'hanging' &&
      css`
        align-items: end;
      `}
    
    transform: scale(${xScale}, ${yScale});
    transform-origin: 1px top;
    
    text-overflow: ellipsis;
    white-space: pre;
  `}
`;

const initialSvgTextSize = { width: 0, height: 0 };
const initialSvgTextScale = { xScale: 1, yScale: 1 };

type Props = {
  children: string,
  variant?: ThemeStyle,
  x?: number,
  y?: number,
} & SvgTypographyProps;

/**
 * @description Svg foreign text styled according to root html document.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SvgTypography({
  children,
  variant = 'body1',
  x = 0,
  y = 0,
  width,
  ...typography
}: Props) {
  children = React.Children.toArray(children).join(' ');

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
      const textMetrics = context.measureText(children);
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
    <foreignObject
      ref={useAutoCallback((foreign) => {
        foreignRef.current = foreign;
        updateTransform();
      })}
      height={'100%'}
      width={'100%'}
      x={x - size.width * scale.xScale}
      y={y - size.height * scale.yScale}
    >
      <Offscreen ref={offscreenRef} variant={variant} />
      <StyledTypography variant={variant} {...typography} {...size} {...scale}>
        {children}
      </StyledTypography>
    </foreignObject>
  );
}
