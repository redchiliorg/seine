// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
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
  meta?: { [string]: any },
};

const StyledTypography = styled(Typography).attrs(({ fill }) => ({
  color: fill,
}))`
  transform-origin: left top;
  ${({ transform }) => ({ transform })};
  overflow: visible;
  white-space: pre-wrap;
  text-align: ${({ textAnchor }) =>
    textAnchor === 'end'
      ? 'right'
      : textAnchor === 'middle'
      ? 'center'
      : 'left'};
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
    meta,
    ...typography
  }: Props,
  ref
) {
  const foreignObjectRef = React.useRef(null);
  const { current: foreignElement } = foreignObjectRef;

  const canvasElementRef = React.useRef(null);
  const { current: canvasElement } = canvasElementRef;

  const text = useTypographyChildren(children);
  const { fontWeight = 400, fontSize, fontFamily, lineHeight } = useAutoMemo(
    canvasElement
      ? getComputedStyle(canvasElement)
      : defaultTheme.typography[variant]
  );
  const methods: SvgTypographyMethods = useAutoMemo(() => {
    if (foreignElement && canvasElement) {
      const getHeight = () => parseFloat(lineHeight);
      const getWidth = () => {
        const context = canvasElement.getContext('2d');
        context.font = `${fontWeight} ${fontSize} '${fontFamily}'`;
        return context.measureText(text).width + parseInt(fontSize);
      };
      const getXScale = (value = 1) =>
        (window.devicePixelRatio * value * foreignElement.getBBox().width) /
        foreignElement.getBoundingClientRect().width;
      const getYScale = (value = 1) =>
        (window.devicePixelRatio * value * foreignElement.getBBox().height) /
        foreignElement.getBoundingClientRect().height;
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

  const condensedFactor = Math.min(
    typeof height === 'number' && height < scaledTextHeight
      ? height / scaledTextHeight
      : Infinity,
    typeof width === 'number' && width < scaledTextWidth
      ? width / scaledTextWidth
      : Infinity
  );

  return (
    <SvgTypographyForeign
      ref={foreignObjectRef}
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
        transform={getForeignObjectTransform(foreignElement, methods)}
      >
        {condensedFactor !== Infinity ? (
          <CondensedText factor={condensedFactor}>{children}</CondensedText>
        ) : (
          children
        )}
      </Container>
    </SvgTypographyForeign>
  );
});

/**
 * @description Based on https://github.com/marp-team/marpit-svg-polyfill
 * @param {HTMLElement} foreignObject
 * @param {SvgTypographyMethods} methods
 * @returns {number}
 */
function getForeignObjectTransform(
  foreignObject: HTMLElement,
  methods: SvgTypographyMethods
) {
  if (navigator.vendor === 'Apple Computer, Inc.' && foreignObject) {
    const svg = foreignObject.ownerSVGElement;
    const x = foreignObject.x.baseVal.value;
    const y = foreignObject.y.baseVal.value;

    const width = svg.viewBox.baseVal.width / svg.currentScale;
    const height = svg.viewBox.baseVal.height / svg.currentScale;
    const scale = Math.min(svg.clientHeight / height, svg.clientWidth / width);

    return `translate3d(${(svg.clientWidth - scale * width) / 2 -
      x}px, ${(svg.clientHeight - scale * height) / 2 -
      y}px, 0) scale(${methods.getXScale(scale)}, ${methods.getYScale(
      scale
    )}) translate(${x * scale}px, ${y * scale}px)`;
  }

  return `scale(${methods.getXScale()}, ${methods.getYScale()})`;
}
