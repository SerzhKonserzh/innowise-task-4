import { css } from '@emotion/react';
import { theme } from '../../theme/theme';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export const Select = ({ options, ...props }: SelectProps) => {
  return (
    <select
      {...props}
      css={theme => css`
        padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
        border-radius: ${theme.borderRadius.medium};
        border: 1px solid ${theme.colors.border};
        background-color: ${theme.colors.backgroundCard};
        color: ${theme.colors.textPrimary};
        font-size: ${theme.typography.fontSize.sm};
        min-width: 120px;
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 8px center;
        background-size: 16px;
        padding-right: 32px;
        
        &:focus {
          outline: none;
          border-color: ${theme.colors.accent};
          box-shadow: ${theme.shadows.focus};
        }
        
        &:hover {
          border-color: ${theme.colors.textTertiary};
        }
        
        option {
          background-color: ${theme.colors.backgroundCard};
          color: ${theme.colors.textPrimary};
          
          &:hover {
            background-color: ${theme.colors.backgroundSecondary};
          }
          
          &:checked {
            background-color: ${theme.colors.accent};
            color: ${theme.colors.textInverse};
          }
        }
      `}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};