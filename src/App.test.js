import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';

// Mock useNavigate
// jest.mock('react-router', () => {
//   const originalModule = jest.requireActual('react-router');
//   return {
//     ...originalModule,
//     useNavigate: jest.fn(),
//   };
// });

jest.mock('react-router', () => {
  const originalModule = jest.requireActual('react-router');
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

// const mockNavigate = require('react-router').useNavigate;

// beforeEach(() => {
//   mockNavigate.mockReset(); // Reset mock state before each test
// });

test('renders Login page by default', () => {
  render(<App />);
  expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});

test('navigates to Create Account page', async () => {
  render(<App />);
  const user = userEvent.setup();

  const menuButton = screen.getByRole('button', { name: /menu/i });
  // expect(menuButton).toBeInTheDocument();

  // await user.click(menuButton);
  // await user.click(screen.getByText(/Create Account/i));
  // expect(await screen.getByText(/Create Account/i)).toBeInTheDocument();
});

// test('navigates to Forum page', async () => {
//   render(<App />);
//   const user = userEvent.setup();

//   await user.click(screen.getByText(/Menu/i));
//   await user.click(screen.getByText(/Forum/i));
//   expect(screen.getByText(/Forum/i)).toBeInTheDocument();
// });

// test('drawer opens and closes', async () => {
//   render(<App />);
//   const user = userEvent.setup();
//   const menuButton = screen.getByRole('button', { name: /menu/i });

//   await user.click(menuButton);
//   expect(screen.getByText(/Create Account/i)).toBeInTheDocument();

//   await user.click(menuButton);
//   expect(screen.queryByText(/Create Account/i)).not.toBeInTheDocument();
// });


// function renderWithRouter(ui, { initialEntries = ['/'] } = {}) {
//   return {
//     ...render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>)
//   };
// }

// test('renders Login page by default', () => {
//   renderWithRouter(<App />);
//   expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
// });

// test('navigates to Create Account page', async () => {
//   renderWithRouter(<App />);
//   const user = userEvent.setup();
//   await user.click(screen.getByText(/Menu/i));
//   await user.click(screen.getByText(/Create Account/i));
//   expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
// });

// test('navigates to Forum page', async () => {
//   renderWithRouter(<App />);
//   const user = userEvent.setup();
//   await user.click(screen.getByText(/Menu/i));
//   await user.click(screen.getByText(/Forum/i));
//   expect(screen.getByText(/Forum/i)).toBeInTheDocument();
// });

// test('drawer opens and closes', async () => {
//   renderWithRouter(<App />);
//   const user = userEvent.setup();
//   const menuButton = screen.getByRole('button', { name: /menu/i });
//   await user.click(menuButton);
//   expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
//   await user.click(menuButton);
//   expect(screen.queryByText(/Create Account/i)).not.toBeInTheDocument();
// });

