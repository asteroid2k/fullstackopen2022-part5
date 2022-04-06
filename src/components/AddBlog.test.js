import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlog from './AddBlog';
import userEvent from '@testing-library/user-event';

const testBlog = {
  title: 'Battle',
  author: 'Thokk',
  url: 'www.battlebeast.com/battle',
  likes: 50,
  user: { username: 'Thokky' },
};

const handleSubmit = jest.fn();

beforeEach(() => {
  render(<AddBlog blog={testBlog} handleSubmit={handleSubmit} />);
});

describe('Test Blog Component', () => {
  describe('button events', () => {
    test('submit handler is called', () => {
      const { title, author, url } = testBlog;
      userEvent.type(screen.getByLabelText('Title'), title);
      userEvent.type(screen.getByLabelText('Author'), author);
      userEvent.type(screen.getByLabelText('Url'), url);

      const button = screen.getByText('Post');
      userEvent.click(button);
      expect(handleSubmit).toHaveBeenCalledWith({ title, author, url });
      expect(handleSubmit.mock.calls).toHaveLength(1);
    });
  });
});
