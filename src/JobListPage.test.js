import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import JobListPage from './JobListPage';

test('renders Job List Page', async () => {
  render(
    <MemoryRouter>
      <JobListPage />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Job Postings/i)).toBeInTheDocument();
});
