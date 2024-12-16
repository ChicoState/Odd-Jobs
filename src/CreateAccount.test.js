import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import CreateAccount from './CreateAccount';

// Mock the navigate function
const mockedNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockedNavigate,
}));

test('renders Create Account page', async () => {
  render(
    <MemoryRouter>
      <CreateAccount />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Create your Odd Jobs Account/i)).toBeInTheDocument();
});

test('allows user to fill out the form', async () => {
  render(
    <MemoryRouter>
      <CreateAccount />
    </MemoryRouter>
  );

  const nameInput = screen.getByLabelText(/Name/i, { selector: 'input[name="firstName"]' });
  const lastnameInput = screen.getByLabelText(/Lastname/i, { selector: 'input[name="lastName"]' });
  const emailInput = screen.getByLabelText(/Email/i, { selector: 'input[name="email"]' });
  const phoneNumberInput = screen.getByLabelText(/Phone Number/i, { selector: 'input[name="phoneNumber"]' });
  const usernameInput = screen.getByLabelText(/Username/i, { selector: 'input[name="username"]' });
  const passwordInput = screen.getByLabelText(/Password/i, { selector: 'input[name="password"]' });
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i, { selector: 'input[name="confirmPassword"]' });

  await userEvent.type(nameInput, 'John');
  await userEvent.type(lastnameInput, 'Doe');
  await userEvent.type(emailInput, 'john.doe@example.com');
  await userEvent.type(phoneNumberInput, '1234567890');
  await userEvent.type(usernameInput, 'johndoe');
  await userEvent.type(passwordInput, 'password123');
  await userEvent.type(confirmPasswordInput, 'password123');

  expect(nameInput).toHaveValue('John');
  expect(lastnameInput).toHaveValue('Doe');
  expect(emailInput).toHaveValue('john.doe@example.com');
  expect(phoneNumberInput).toHaveValue('1234567890');
  expect(usernameInput).toHaveValue('johndoe');
  expect(passwordInput).toHaveValue('password123');
  expect(confirmPasswordInput).toHaveValue('password123');
});

test('shows error message when passwords do not match', async () => {
  window.alert = jest.fn(); // Mock the alert function

  render(
    <MemoryRouter>
      <CreateAccount />
    </MemoryRouter>
  );

  const passwordInput = screen.getByLabelText(/Password/i, { selector: 'input[name="password"]' });
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i, { selector: 'input[name="confirmPassword"]' });
  const submitButton = screen.getByRole('button', { name: /Next/i });

  await userEvent.type(passwordInput, 'password123');
  await userEvent.type(confirmPasswordInput, 'password456');
  await userEvent.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith('Passwords do not match');
});

test('submits the form successfully', async () => {
  window.alert = jest.fn(); // Mock the alert function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'Account created' }),
    })
  );

  render(
    <MemoryRouter>
      <CreateAccount />
    </MemoryRouter>
  );

  const nameInput = screen.getByLabelText(/Name/i, { selector: 'input[name="firstName"]' });
  const lastnameInput = screen.getByLabelText(/Lastname/i, { selector: 'input[name="lastName"]' });
  const emailInput = screen.getByLabelText(/Email/i, { selector: 'input[name="email"]' });
  const phoneNumberInput = screen.getByLabelText(/Phone Number/i, { selector: 'input[name="phoneNumber"]' });
  const usernameInput = screen.getByLabelText(/Username/i, { selector: 'input[name="username"]' });
  const passwordInput = screen.getByLabelText(/Password/i, { selector: 'input[name="password"]' });
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i, { selector: 'input[name="confirmPassword"]' });
  const submitButton = screen.getByRole('button', { name: /Next/i });

  await userEvent.type(nameInput, 'John');
  await userEvent.type(lastnameInput, 'Doe');
  await userEvent.type(emailInput, 'john.doe@example.com');
  await userEvent.type(phoneNumberInput, '1234567890');
  await userEvent.type(usernameInput, 'johndoe');
  await userEvent.type(passwordInput, 'password123');
  await userEvent.type(confirmPasswordInput, 'password123');
  await userEvent.click(submitButton);

  expect(global.fetch).toHaveBeenCalledWith('http://localhost:5050/api/users/register', expect.any(Object));
  expect(mockedNavigate).toHaveBeenCalledWith('/');
  expect(window.alert).toHaveBeenCalledWith('Account successfully created!');
});

