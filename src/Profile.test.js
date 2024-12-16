import { render, screen } from '@testing-library/react';
import Profile from './Profile';

test('renders Profile page', () => {
  render(<Profile />);
  expect(screen.getByText(/Profile/i)).toBeInTheDocument();
});
