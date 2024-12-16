import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock useNavigate
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

function renderWithRouter(ui, { initialEntries = ['/'] } = {}) {
  return {
    ...render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>)
  };
}

test('renders Login page by default', () => {
  renderWithRouter(<App />);
  expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});

test('navigates to Create Account page', async () => {
  renderWithRouter(<App />);
  const user = userEvent.setup();
  await user.click(screen.getByText(/Menu/i));
  await user.click(screen.getByText(/Create Account/i));
  expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
});

test('navigates to Forum page', async () => {
  renderWithRouter(<App />);
  const user = userEvent.setup();
  await user.click(screen.getByText(/Menu/i));
  await user.click(screen.getByText(/Forum/i));
  expect(screen.getByText(/Forum/i)).toBeInTheDocument();
});

test('drawer opens and closes', async () => {
  renderWithRouter(<App />);
  const user = userEvent.setup();
  const menuButton = screen.getByRole('button', { name: /menu/i });
  await user.click(menuButton);
  expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
  await user.click(menuButton);
  expect(screen.queryByText(/Create Account/i)).not.toBeInTheDocument();
});

