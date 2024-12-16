import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Forum from './Forum';

test('renders Forum page', async () => {
  render(
    <MemoryRouter>
      <Forum />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Forum/i)).toBeInTheDocument();
});



