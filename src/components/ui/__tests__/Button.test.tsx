import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { Button } from '../Button';
import type { ButtonProps } from '../Button';
import { theme } from '../../../theme/theme';

const TestButton: React.FC<{ children: React.ReactNode } & ButtonProps> = ({ children, ...props }) => (
  <ThemeProvider theme={theme}>
    <Button {...props}>{children}</Button>
  </ThemeProvider>
);

describe('Button', () => {
  test('renders with default props', () => {
    render(<TestButton>Click me</TestButton>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle('background-color: #0099ff');
  });

  test('applies correct styles for variant and size', () => {
    render(<TestButton variant="secondary" size="large">Large Secondary</TestButton>);
    const buttonElement = screen.getByRole('button', { name: /large secondary/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle('height: 48px');
  });
});