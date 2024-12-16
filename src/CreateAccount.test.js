import { render, screen } from '@testing-library/react';
import CreateAccount from './CreateAccount';

test('renders Create Account page', () => {
  render(<CreateAccount />);
  expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
});
