import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Forum from './Forum';

test('renders Forum page', async () => {
  render(
    <MemoryRouter>
      <Forum />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Forum Us/i)).toBeInTheDocument();
});

test('allows user to type in the forum input', async () => {
  render(
    <MemoryRouter>
      <Forum />
    </MemoryRouter>
  );
  const input = screen.getByLabelText(/What do you need help with?/i);
  await userEvent.type(input, 'I need help with testing.');
  expect(input).toHaveValue('I need help with testing.');
});



