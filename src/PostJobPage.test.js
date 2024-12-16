import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PostJobPage from './PostJobPage';

test('renders Post Job Page', async () => {
  render(
    <MemoryRouter>
      <PostJobPage />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Post a Job/i)).toBeInTheDocument();
});
