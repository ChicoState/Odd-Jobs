import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('allows user to fill out the form and submit', async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const loginButton = screen.getByRole('button', { name: /Login/i });

  await userEvent.type(usernameInput, 'testuser');
  await userEvent.type(passwordInput, 'password123');
  await userEvent.click(loginButton);

  expect(usernameInput).toHaveValue('testuser');
  expect(passwordInput).toHaveValue('password123');
});
