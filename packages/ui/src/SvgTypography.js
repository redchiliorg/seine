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

const initialSvgTextSize = { width: 0, height: 0 };

type Props = {
  as?: 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  children: string,
  variant?: ThemeStyle,
  x?: number,
  y?: number,
};

/**
 * @description Svg foreign text styled according to root html document.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SvgTypography({
  as: Content = 'p',
  children,
  fill,
  variant = 'body1',
  x = 0,
  y = 0,
  ...typography
}: Props) {
  children = React.Children.toArray(children).join(' ');

  // use svg and html boxes of foreign object to determine text transform
  const foreignRef = React.useRef(null);
  const [transform, setTransform] = React.useState(null);
  const updateTransform = useAutoCallback(() => {
    const { current: foreign } = foreignRef;
    if (foreign) {
      const svgBox = foreign.getBBox();
      const htmlBox = foreign.getBoundingClientRect();
      setTransform(
        `scale(${[
          svgBox.width / htmlBox.width,
          svgBox.height / htmlBox.height,
        ]})`
      );
    } else {
      setTransform(null);
    }
  });

  // use text transform update handler on global resize event
  useAutoEffect(() => {
    window.addEventListener('resize', updateTransform);
    return () => {
      window.removeEventListener('resize', updateTransform);
    };
  });

  // use text size measured by an offscreen canvas context
  const [size, setSize] = React.useState(initialSvgTextSize);
  const offscreenRef = React.useRef(null);
  const updateSize = useAutoCallback(() => {
    const { current: offscreen } = offscreenRef;
    if (offscreen) {
      const { fontWeight, fontSize, fontFamily, lineHeight } = getComputedStyle(
        offscreen
      );
      const context = offscreen.getContext('2d');
      context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
      setSize({
        width: context.measureText(children).width,
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
      x={x}
      y={y}
    >
      <Offscreen ref={offscreenRef} variant={variant} />
      <Typography
        as={Content}
        color={fill}
        variant={variant}
        {...typography}
        {...size}
        transform={transform}
      >
        {children}
      </Typography>
    </foreignObject>
  );
}
