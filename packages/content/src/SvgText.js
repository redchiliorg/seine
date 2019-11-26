// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';

import Text from './Text';

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
  children: string,
};

/**
 * @description Svg foreign text styled according to root html document.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SvgText({
  as: Content = 'p',
  children,
  variant = 'body1',
  x,
  y,
}: Props) {
  // use svg and html boxes of foreign object to determine text transform
  const foreignRef = React.useRef(null);
  const [transform, setTransform] = React.useState(null);
  const updateTransform = React.useCallback(() => {
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
  }, []);

  // use text transform update handler on global resize event
  React.useEffect(() => {
    window.addEventListener('resize', updateTransform);
    return () => {
      window.removeEventListener('resize', updateTransform);
    };
  }, [updateTransform]);

  // use text size measured by an offscreen canvas context
  const [size, setSize] = React.useState(initialSvgTextSize);
  const offscreenRef = React.useRef(null);
  const updateSize = React.useCallback(() => {
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
  }, [children]);

  // use text size update handler on global (font) load event
  React.useEffect(() => {
    updateSize();
    window.addEventListener('load', updateSize);
    return () => {
      window.removeEventListener('load', updateSize);
    };
  }, [updateSize]);

  return (
    <foreignObject
      ref={React.useCallback(
        (foreign) => {
          foreignRef.current = foreign;
          updateTransform();
        },
        [updateTransform]
      )}
      height={'100%'}
      width={'100%'}
      x={x}
      y={y}
    >
      <Offscreen ref={offscreenRef} variant={variant} />
      <Text as={Content} variant={variant} {...size} transform={transform}>
        {children}
      </Text>
    </foreignObject>
  );
}
