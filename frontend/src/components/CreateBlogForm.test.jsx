import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CreateBLogForm from './CreateBlogForm';

describe('CreateBlogForm component', () => {
  test('the form calls the function to create blog', async() => {
    const mockHandler = vi.fn();
    const user = userEvent.setup();

    render(<CreateBLogForm mock={mockHandler} setBlogs={() => null} />);

    const input = screen.getAllByRole('textbox');
    const sendButton = screen.getByText('Create');

    await user.type(input[0], 'test title');
    await user.type(input[1], 'testing author');
    await user.type(input[2], 'testing url');
    await user.click(sendButton);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0].title).toBe('test title');
  });
});