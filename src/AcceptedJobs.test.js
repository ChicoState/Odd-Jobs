import { render, screen } from '@testing-library/react';
import { act } from 'react';
import AcceptedJobs from './AcceptedJobs';

test('renders Accepted Jobs page', () => {
  act(() => {
    render(<AcceptedJobs />);
  });
  expect(screen.getByText(/Accepted Jobs/i)).toBeInTheDocument();
});