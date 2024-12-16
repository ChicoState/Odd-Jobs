import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import PostJobPage from './PostJobPage';

test('renders Post Job Page', async () => {
  render(
    <MemoryRouter>
      <PostJobPage />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Post a Job/i)).toBeInTheDocument();
});

test('allows user to fill out the form and submit', async () => {
  render(
    <MemoryRouter>
      <PostJobPage />
    </MemoryRouter>
  );

  const titleInput = screen.getByLabelText(/Title/i);
  const descriptionInput = screen.getByLabelText(/Description/i);
  const locationInput = screen.getByLabelText(/Location/i);
  const payInput = screen.getByLabelText(/Pay/i);
  const durationInput = screen.getByLabelText(/Duration/i);
  const submitButton = screen.getByRole('button', { name: /Submit Job/i });

  await userEvent.type(titleInput, 'Test Job');
  await userEvent.type(descriptionInput, 'This is a test job description.');
  await userEvent.type(locationInput, 'Test Location');
  await userEvent.type(payInput, '100');
  await userEvent.type(durationInput, '2');
  await userEvent.click(submitButton);

  expect(titleInput).toHaveValue('Test Job');
  expect(descriptionInput).toHaveValue('This is a test job description.');
  expect(locationInput).toHaveValue('Test Location');
  expect(payInput).toHaveValue(100); // Expect a number
  expect(durationInput).toHaveValue(2); // Expect a number
});
