import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Login from './Login';

test('renders Login page', async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});
