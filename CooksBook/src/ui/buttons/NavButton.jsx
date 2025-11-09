import styled, { css } from 'styled-components';

const variantStyles = {
  default: {
    background: '#d9d9d9',
    border: 'none',
    hoverBackground: '#a7b098',
    shadow: 'none',
  },
  ghost: {
    background: 'rgba(244, 246, 239, 0.92)',
    border: '1px solid rgba(205, 214, 193, 0.8)',
    hoverBackground: '#ffffff',
    shadow: '0px 12px 30px rgba(30, 51, 31, 0.18)',
  },
};

const baseTransform = ({ $top, $bottom }) => {
  if ($top != null) return 'translateY(-50%)';
  if ($bottom != null) return 'translateY(50%)';
  return 'none';
};

const hoverTransform = ({ $top, $bottom }) => {
  if ($top != null) return 'translateY(calc(-50% - 1px))';
  if ($bottom != null) return 'translateY(calc(50% - 1px))';
  return 'translateY(-1px)';
};

export const NavButton = styled.button`
  position: absolute;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.9rem;
  border: ${({ $variant = 'default' }) => variantStyles[$variant]?.border};
  background-color: ${({ $variant = 'default' }) =>
    variantStyles[$variant]?.background};
  box-shadow: ${({ $variant = 'default' }) => variantStyles[$variant]?.shadow};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
  transform: ${baseTransform};

  &:focus-visible {
    outline: 3px solid rgba(30, 51, 31, 0.85);
    outline-offset: 3px;
  }

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
    background-color: ${({ $variant = 'default' }) =>
      variantStyles[$variant]?.hoverBackground};
    box-shadow: ${({ $variant = 'default' }) =>
      $variant === 'ghost'
        ? '0px 16px 32px rgba(30, 51, 31, 0.22)'
        : variantStyles[$variant]?.shadow};
    transform: ${hoverTransform};
  }

  &:disabled {
    cursor: default;
    background-color: rgba(228, 231, 220, 0.9);
    opacity: 0.7;
    pointer-events: none;
    box-shadow: none;
    transform: ${baseTransform};
  }
`;
