import { render, screen } from '@testing-library/react';
import Forum from './Forum';

test('renders Forum page', () => {
  render(<Forum />);
  expect(screen.getByText(/Forum/i)).toBeInTheDocument();
});