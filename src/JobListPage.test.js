import { render, screen } from '@testing-library/react';
import JobListPage from './JobListPage';

test('renders Job List Page', () => {
  render(<JobListPage />);
  expect(screen.getByText(/View Job Listing/i)).toBeInTheDocument();
});