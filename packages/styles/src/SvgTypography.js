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
    transform-origin: left top;

    overflow: visible;
    white-space: pre-line;

    text-align: ${({ textAnchor }) =>
      textAnchor === 'start'
        ? 'left'
        : textAnchor === 'middle'
        ? 'center'
        : 'right'};
  `}
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
    children,
    dominantBaseline = 'baseline',
    variant = 'body1',
    height = 1,
    width = 1,
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
      return {
        getHeight() {
          return parseFloat(lineHeight);
        },
        getWidth() {
          const context = canvasElement.getContext('2d');
          context.font = `${fontWeight} ${fontSize} '${fontFamily}'`;
          return context.measureText(text).width;
        },
        getXScale(value = 1) {
          return (
            (value * svgElement.getBBox().height) /
            svgElement.getBoundingClientRect().height
          );
        },
        getYScale(value = 1) {
          return (
            (value * svgElement.getBBox().width) /
            svgElement.getBoundingClientRect().width
          );
        },
        getScaledWidth() {
          return this.getXScale(this.getWidth());
        },
        getScaledHeight() {
          return this.getYScale(this.getHeight());
        },
      };
    }
    return defaultTypographyMethods;
  });

  React.useImperativeHandle(ref, () => methods, [methods]);

  return (
    <SvgTypographyForeign
      ref={svgElementRef}
      height={'100%'}
      width={'100%'}
      x={
        x -
        (textAnchor === 'start'
          ? 0
          : methods.getScaledWidth() / (textAnchor === 'end' ? 1 : 2))
      }
      y={
        y -
        (dominantBaseline === 'hanging'
          ? 0
          : methods.getScaledHeight() /
            (dominantBaseline === 'baseline' ? 1 : 2))
      }
    >
      <SvgTypographyCanvas
        ref={canvasElementRef}
        variant={variant}
        height={methods.getHeight()}
        width={methods.getWidth()}
      />
      <StyledTypography
        variant={variant}
        {...typography}
        textAnchor={textAnchor}
        width={methods.getWidth()}
        yScale={methods.getYScale()}
        xScale={methods.getXScale()}
      >
        {children}
      </StyledTypography>
    </SvgTypographyForeign>
  );
});
