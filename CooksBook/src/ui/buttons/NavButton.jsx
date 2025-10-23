import styled, { css } from 'styled-components';

export const NavButton = styled.button`
  position: absolute;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.6rem;
  border: none;
  background-color: #d9d9d9;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ $left }) =>
    $left != null &&
    css`
      left: ${$left};
    `}
  ${({ $right }) =>
    $right != null &&
    css`
      right: ${$right};
    `}
  ${({ $top }) =>
    $top != null &&
    css`
      top: ${$top};
    `}
  ${({ $bottom }) =>
    $bottom != null &&
    css`
      bottom: ${$bottom};
    `}
  &:hover {
      background-color: #a7b098;
  }
`;