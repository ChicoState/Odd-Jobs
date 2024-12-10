import { act } from 'react'
import userEvent from '@testing-library/user-event'
import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter as Router, Route, Routes, Link, MemoryRouter, Navigate } from 'react-router-dom';
import '@testing-library/jest-dom'
import App from './App';
import Login from './Login';
import Forum from './Forum';
import AcceptedJobs from './AcceptedJobs';
import CreateAccount from './CreateAccount';
import PastWorkersHistory from './PastWorkersHistory';
import PostJobPage from './PostJobPage';
import JobListPage from './JobListPage';

// Mock the useNavigate hook to prevent actual navigation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), useNavigate: jest.fn(),
  useNavigate: jest.fn(),
}));

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('Login Mock test', async () => {
  render(
    //<BrowserRouter>
    <App />
    //</BrowserRouter>
    // <Routes>
    //   <Route path="/" element={<Login />} />
    //   <Route path="/forum" element={<Forum />} />
    // </Routes>
  );
  const user = userEvent.setup()

  // simulate interaction with the form (put username and password into fields)
  // fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'Tester' } });
  // fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'McGee' } });

  user.click(screen.getByText(/Login/i));

  await act(async () => {
      expect(Navigate).toHaveBeenCalledTimes(1);

      expect(Navigate).toHaveBeenCalledWith('/forum');
  });
  expect(screen.getByTitle(/Forum Us/i));

  // Simulate form submission (pressing login button)
  // fireEvent.click(screen.getByRole('button', { name: /Login/i }));

  // //expect(console.log).toHaveBeenCalledWith({Username: 'Tester', Password: 'McGee'});

});

test('Username and password is showing correctly', async () => {
  render(
    //<BrowserRouter> {/* Wrap the component in BrowserRouter*/}
      <App />
    //</BrowserRouter>
  );

  // gets the label by text
  const username = await screen.getByLabelText(/Username/i);
  expect(username).toBeInTheDocument();
  const password = await screen.getByLabelText(/Password/i);
  expect(password).toBeInTheDocument();
});

