import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import Profile from './Profile';
import PostJobPage from './PostJobPage';
import AcceptedJobs from './AcceptedJobs';
import JobListPage from './JobListPage';
import PastWorkersHistory from './PastWorkersHistory';
import Login from './Login';

// Mock the fetch function to avoid making actual network requests
global.fetch = jest.fn((url) => {
  if (url.includes('/api/jobs')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    });
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  });
});

test('renders Profile page', async () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  expect(await screen.findByRole('heading', { name: /Profile/i })).toBeInTheDocument();
});

test('allows user to upload a profile picture', async () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );

  const fileInput = screen.getByLabelText(/Upload Profile Picture/i);
  const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

  await userEvent.upload(fileInput, file);

  expect(fileInput.files[0]).toBe(file);
  expect(fileInput.files).toHaveLength(1);
});

test('navigates to Post Job Page', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/PostJobPage" element={<PostJobPage />} />
      </Routes>
    </MemoryRouter>
  );

  const postJobLink = screen.getByRole('link', { name: /Post a Job/i });
  await userEvent.click(postJobLink);

  expect(await screen.findByText(/Post a Job/i)).toBeInTheDocument();
});


test('navigates to Job List Page', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/JobListPage" element={<JobListPage />} />
      </Routes>
    </MemoryRouter>
  );

  const jobListLink = screen.getByRole('link', { name: /View Job Listing/i });
  await userEvent.click(jobListLink);

  expect(await screen.findByText(/Job Postings/i)).toBeInTheDocument();
});

test('navigates to Past Workers History Page', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/pastworkershistory" element={<PastWorkersHistory />} />
      </Routes>
    </MemoryRouter>
  );

  const pastWorkersHistoryLink = screen.getByRole('link', { name: /Past Workers History/i });
  await userEvent.click(pastWorkersHistoryLink);

  expect(await screen.findByText(/Past Workers History/i)).toBeInTheDocument();
});

