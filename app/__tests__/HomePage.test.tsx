import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';

test('renders home page with title', () => {
  render(<HomePage />);
  const heading = screen.getByText(/Nacho Blog/i);
  expect(heading).toBeInTheDocument();
});
