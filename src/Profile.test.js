import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Profile from './Profile';

test('renders Profile page', async () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Profile/i)).toBeInTheDocument();
});
