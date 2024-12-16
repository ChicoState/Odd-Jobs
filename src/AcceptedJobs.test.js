import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AcceptedJobs from './AcceptedJobs';

test('renders Accepted Jobs page', async () => {
  render(
    <MemoryRouter>
      <AcceptedJobs />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
});
