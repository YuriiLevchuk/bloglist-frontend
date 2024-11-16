import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Blog from './Blog';

describe('Blog component', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author1',
    url: 'h132123132',
    likes: 3,
    user:{
      name:'abcd',
      username:'abcd'
    }
  };
  const blogUser = {
    name:123,
    username:312
  };
  
  test('renders title', () => {
    render(<Blog blog={blog} user={blogUser} />);
  
    const element = screen.getByText('"Component testing is done with react-testing-library" by author1');
    expect(element).toBeDefined();
  });
  
  test('shows url and num of likes in full view', async() => {
    render(<Blog blog={blog} user={blogUser}/>);
  
    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);
  
    const url = screen.getByText('h132123132');
    expect(url).toBeDefined();
  
    const likes = screen.getByText(`likes ${blog.likes}`);
    expect(likes).toBeDefined();
  });

  // had to modify Blog comonent to do the exercise acording to the instruction
  test('like button clicked twice', async() => {
    const mockHandler = vi.fn();
    const user = userEvent.setup();
    render(<Blog blog={blog} user={blogUser} mock={mockHandler}/>);

    await user.click(screen.getByText('View'));
    await user.click(screen.getByText('like'));
    await user.click(screen.getByText('like'));

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
