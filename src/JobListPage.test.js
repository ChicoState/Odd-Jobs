import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import JobListPage from './JobListPage';

const mockJobs = [
  {
    _id: '1',
    title: 'Job 1',
    description: 'Description 1',
    location: 'Location 1',
    pay: 100,
    duration: 2,
    picked: false,
  },
  {
    _id: '2',
    title: 'Job 2',
    description: 'Description 2',
    location: 'Location 2',
    pay: 200,
    duration: 4,
    picked: false,
  },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockJobs),
    })
  );
  window.alert = jest.fn(); // Mock the alert function
});

test('renders Job List Page', async () => {
  render(
    <MemoryRouter>
      <JobListPage />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Job Postings/i)).toBeInTheDocument();
  expect(await screen.findByText(/Job 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/Job 2/i)).toBeInTheDocument();
});

test('allows user to apply filters', async () => {
  render(
    <MemoryRouter>
      <JobListPage />
    </MemoryRouter>
  );

  const minPayInput = screen.getByLabelText(/Minimum Pay/i);
  const applyFiltersButton = screen.getByRole('button', { name: /Apply Filters/i });

  await userEvent.type(minPayInput, '150');
  await userEvent.click(applyFiltersButton);

  expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('minPay=150'));
});

test('allows user to pick a job', async () => {
  render(
    <MemoryRouter>
      <JobListPage />
    </MemoryRouter>
  );

  const pickJobButtons = await screen.findAllByRole('button', { name: /Pick Job/i });
  await userEvent.click(pickJobButtons[0]);

  expect(global.fetch).toHaveBeenCalledWith('http://localhost:5050/api/jobs/1/pick', expect.any(Object));
  expect(window.alert).toHaveBeenCalledWith('Job picked successfully!');
  expect(await screen.findByRole('button', { name: /Already Picked/i })).toBeInTheDocument();
});
