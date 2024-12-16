import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import CreateAccount from './CreateAccount';

test('renders Create Account page', async () => {
  render(
    <MemoryRouter>
      <CreateAccount />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Create your Odd Jobs Account/i)).toBeInTheDocument();
});

