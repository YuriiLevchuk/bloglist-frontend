import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author1',
    url: 'h132123132'
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText('"Component testing is done with react-testing-library" by author1');

  expect(element).toBeDefined();
});