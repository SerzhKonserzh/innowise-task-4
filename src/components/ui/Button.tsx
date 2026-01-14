import styled from '@emotion/styled';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${p => p.theme.borderRadius.medium};
  cursor: pointer;
  font-weight: ${p => p.theme.typography.fontWeight.semibold};
  transition: all 0.2s ease-in-out;
  outline: none;
  
  ${p => {
    switch (p.variant) {
      case 'secondary':
        return `
          background-color: ${p.theme.colors.backgroundTertiary};
          color: ${p.theme.colors.textPrimary};
          &:hover {
            background-color: ${p.theme.colors.backgroundSecondary};
            transform: translateY(-1px);
          }
          &:active {
            transform: translateY(0);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${p.theme.colors.textPrimary};
          border: 1px solid ${p.theme.colors.border};
          &:hover {
            background-color: ${p.theme.colors.backgroundSecondary};
            border-color: ${p.theme.colors.textPrimary};
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${p.theme.colors.textPrimary};
          &:hover {
            background-color: ${p.theme.colors.backgroundSecondary};
          }
        `;
      case 'primary':
      default:
        return `
          background-color: ${p.theme.colors.accent};
          color: ${p.theme.colors.textInverse};
          &:hover {
            background-color: ${p.theme.colors.accentHover};
            transform: translateY(-1px);
            box-shadow: ${p.theme.shadows.hover};
          }
          &:active {
            transform: translateY(0);
          }
          &:focus {
            box-shadow: ${p.theme.shadows.focus};
          }
        `;
    }
  }}
  
  ${p => {
    switch (p.size) {
      case 'small':
        return `
          height: 32px;
          padding: 0 ${p.theme.spacing(2)};
          font-size: ${p.theme.typography.fontSize.sm};
        `;
      case 'large':
        return `
          height: 48px;
          padding: 0 ${p.theme.spacing(4)};
          font-size: ${p.theme.typography.fontSize.lg};
        `;
      case 'medium':
      default:
        return `
          height: ${p.theme.components.button.height};
          padding: 0 ${p.theme.spacing(3)};
          font-size: ${p.theme.typography.fontSize.base};
        `;
    }
  }}
  
  ${p => p.fullWidth && `
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  &:focus {
    outline: none;
  }
`;