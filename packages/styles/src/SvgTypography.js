// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import type { ThemeStyle } from '@material-ui/core/styles/createTypography';
import { useAutoMemo } from 'hooks.macro';

import SvgTypographyCanvas from './SvgTypographyCanvas';
import SvgTypographyForeign from './SvgTypographyForeign';
import Typography from './Typography';
import defaultTheme from './defaultTheme';
import useTypographyChildren from './useTypographyChildren';

export type SvgTypographyProps = {
  fill?: string,
  textAnchor?: 'start' | 'middle' | 'end',
  dominantBaseline?: 'middle' | 'baseline' | 'hanging',
};

export type BoxProps = {
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
    transform-origin: left top;

    overflow: visible;
    white-space: pre-wrap;

    text-align: ${({ textAnchor }) =>
      textAnchor === 'end'
        ? 'right'
        : textAnchor === 'middle'
        ? 'center'
        : 'left'};
  `}
`;

const CondensedText = styled.span`
  && {
    font-size: ${({ factor }) => factor}em;
    height: 100%;
    width: 100%;
  }
`;

export const defaultTypographyMethods = {
  getWidth: () => 1,
  getHeight: () => 1,
  getXScale: (xScale = 1) => xScale,
  getYScale: (yScale = 1) => yScale,
  getScaledWidth: () => 1,
  getScaledHeight: () => 1,
};

export type SvgTypographyMethods = typeof defaultTypographyMethods;

export type Props = {
  children?: string,
  variant?: ThemeStyle,
  x?: number,
  y?: number,
} & SvgTypographyProps;

/**
 * @description Svg foreign text styled according to root html document.
 * @param {Props} props
 * @returns {React.Node}
 */
export default React.forwardRef(function SvgTypography(
  {
    as: Container = StyledTypography,
    children,
    dominantBaseline = 'baseline',
    variant = 'body1',
    height = 'auto',
    width = 'auto',
    x = 0,
    y = 0,
    textAnchor = 'start',
    ...typography
  }: Props,
  ref
) {
  const svgElementRef = React.useRef<HTMLElement>(null);
  const { current: svgElement } = svgElementRef;

  const canvasElementRef = React.useRef(null);
  const { current: canvasElement } = canvasElementRef;

  const text = useTypographyChildren(children);
  const { fontWeight = 400, fontSize, fontFamily, lineHeight } = useAutoMemo(
    canvasElement
      ? getComputedStyle(canvasElement)
      : defaultTheme.typography[variant]
  );
  const methods: SvgTypographyMethods = useAutoMemo(() => {
    if (svgElement && canvasElement) {
      const getHeight = () => parseFloat(lineHeight);
      const getWidth = () => {
        const context = canvasElement.getContext('2d');
        context.font = `${fontWeight} ${fontSize} '${fontFamily}'`;
        return context.measureText(text).width;
      };
      const getXScale = (value = 1) =>
        (window.devicePixelRatio * (value * svgElement.getBBox().height)) /
        svgElement.getBoundingClientRect().height;
      const getYScale = (value = 1) =>
        (window.devicePixelRatio * (value * svgElement.getBBox().width)) /
        svgElement.getBoundingClientRect().width;
      const getScaledWidth = () => getXScale(getWidth());
      const getScaledHeight = () => getYScale(getHeight());
      return {
        getHeight,
        getWidth,
        getXScale,
        getYScale,
        getScaledWidth,
        getScaledHeight,
      };
    }
    return defaultTypographyMethods;
  });

  React.useImperativeHandle(ref, () => methods, [methods]);

  const scaledTextWidth = methods.getScaledWidth();
  const scaledTextHeight = methods.getScaledHeight();

  return (
    <SvgTypographyForeign
      ref={svgElementRef}
      height={'100%'}
      width={'100%'}
      x={
        x -
        (textAnchor === 'start'
          ? 0
          : scaledTextWidth / (textAnchor === 'end' ? 1 : 2))
      }
      y={
        y -
        (dominantBaseline === 'hanging'
          ? 0
          : scaledTextHeight / (dominantBaseline === 'baseline' ? 1 : 2))
      }
    >
      <SvgTypographyCanvas
        ref={canvasElementRef}
        variant={variant}
        height={methods.getHeight()}
        width={methods.getWidth()}
      />
      <Container
        variant={variant}
        {...typography}
        textAnchor={textAnchor}
        width={methods.getWidth()}
        yScale={methods.getYScale()}
        xScale={methods.getXScale()}
      >
        {typeof width === 'number' && scaledTextWidth > width ? (
          <CondensedText factor={width / scaledTextWidth}>
            {children}
          </CondensedText>
        ) : typeof height === 'number' && scaledTextHeight > height ? (
          <CondensedText factor={height / scaledTextHeight}>
            {children}
          </CondensedText>
        ) : (
          children
        )}
      </Container>
    </SvgTypographyForeign>
  );
});
