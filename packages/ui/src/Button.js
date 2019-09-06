// @flow
import styled from 'styled-components';
import clsx from 'clsx';

type Props = {
  color: 'default' | 'primary' | 'danger',
  opacity: number,
};

export default styled.button.attrs(
  ({
    className = 'mui-btn',
    color = 'default',
    size = 'medium',
    type = 'button',
    transparent,
  }: Props) => ({
    className: clsx(
      className,
      `${className}--${color}`,
      `${className}--${size}`
    ),
    transparent,
    type,
  })
)``;
