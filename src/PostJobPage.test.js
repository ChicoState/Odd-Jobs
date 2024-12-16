import { render, screen } from '@testing-library/react';
import PostJobPage from './PostJobPage';

test('renders Post Job Page', () => {
  render(<PostJobPage />);
  expect(screen.getByText(/Post a Job/i)).toBeInTheDocument();
});
