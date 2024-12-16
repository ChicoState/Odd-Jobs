import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders Login page', () => {
  render(<Login />);
  expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});
