// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import type { ThemeStyle } from '@material-ui/core/styles/createTypography';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

import SvgTypographyCanvas from './SvgTypographyCanvas';
import SvgTypographyForeign from './SvgTypographyForeign';
import Typography from './Typography';
import defaultTheme from './defaultTheme';

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

    overflow: hidden;
    white-space: pre;
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

  const text = useAutoMemo(
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
      .join(' ')
  );

  const { fontWeight = 400, fontSize, fontFamily, lineHeight } = useAutoMemo(
    canvasElement
      ? getComputedStyle(canvasElement)
      : defaultTheme.typography[variant]
  );
  const contextFont = useAutoMemo(`${fontWeight} ${fontSize} '${fontFamily}'`);

  const getWidth = useAutoCallback(() => {
    const context = canvasElement.getContext('2d');
    context.font = contextFont;
    return context.measureText(text).width;
  });
  const getHeight = useAutoCallback(() => parseFloat(lineHeight));
  const getXScale = useAutoCallback(
    (value = 1) =>
      (value * svgElement.getBBox().width) /
      svgElement.getBoundingClientRect().width
  );
  const getYScale = useAutoCallback(
    (value = 1) =>
      (value * svgElement.getBBox().height) /
      svgElement.getBoundingClientRect().height
  );
  const methods: SvgTypographyMethods = useAutoMemo(
    svgElement && canvasElement
      ? {
          getWidth,
          getHeight,
          getXScale,
          getYScale,
          getScaledWidth: () => getXScale(getWidth()),
          getScaledHeight: () => getYScale(getHeight()),
        }
      : defaultTypographyMethods
  );

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
        height={methods.getHeight()}
        width={methods.getWidth()}
        yScale={methods.getYScale()}
        xScale={methods.getXScale()}
      >
        {children}
      </StyledTypography>
    </SvgTypographyForeign>
  );
});
