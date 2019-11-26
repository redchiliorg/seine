// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';

import Text from './Text';

const Offscreen = styled.canvas`
  position: absolute;
  ${({
    variant = 'body1',
    theme: {
      typography: {
        [variant]: { fontSize, lineHeight },
      },
    },
  }) => css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `}
`;

type Props = {
  children: string,
};

/**
 * @description Svg foreign text styled according to root html document.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SvgText({ children, variant = 'body1', x, y }: Props) {
  const [width, setWidth] = React.useState(0);
  const offscreenRef = React.useCallback(
    (offscreen: HTMLCanvasElement) => {
      const context = offscreen && offscreen.getContext('2d');
      if (context) {
        const { fontWeight, fontSize, fontFamily } = getComputedStyle(
          offscreen
        );
        context.font = `${fontWeight} ${fontSize} '${fontFamily}'`;
        setWidth(context.measureText(children).width);
      }
    },
    [children]
  );

  return (
    <foreignObject x={x} y={y} width={width} height={'100%'}>
      <Offscreen
        xmlns="http://www.w3.org/1999/xhtml"
        ref={offscreenRef}
        variant={variant}
      />
      <Text
        xmlns="http://www.w3.org/1999/xhtml"
        variant={variant}
        width={width}
      >
        {children}
      </Text>
    </foreignObject>
  );
}
