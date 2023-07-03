import { render, screen } from '@testing-library/react';
import Home from './src/app/page';

test('renders the ToDoApp component', async () => {
  const container = document.body.appendChild(document.createElement('div'));
  ren(<Home />, { container });

  // Get form elements by their label text
  const input = screen.getByLabelText('Username');
  input.value = 'Ada Lovelace';

  // Get elements by their text and simulate a click event
  screen.getByText('Print Username').click();

  await waitFor(() =>
    expect(screen.queryByTestId('printed-username')).toBeTruthy()
  );

  expect(screen.getByTestId('printed-username')).toHaveTextContent(
    'Ada Lovelace'
  );

  // Check the rendered component against a snapshot
  expect(container).toMatchSnapshot();
});
