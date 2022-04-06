import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

const testBlog = {
  title: 'Battle',
  author: 'Thokk',
  url: 'www.battlebeast.com/battle',
  likes: 50,
  user: { username: 'Thokky' },
};

let blogContainer;

const handleLike = jest.fn();
const handleDelete = jest.fn();

beforeEach(() => {
  blogContainer = render(
    <Blog blog={testBlog} handleDelete={handleDelete} handleLike={handleLike} />
  ).container;
});

describe('Test Blog Component', () => {
  describe('rendering of elements', () => {
    test('only title and author are rendered', () => {
      screen.getByText(testBlog.title);
      screen.getByText('by ' + testBlog.author);
      expect(blogContainer.querySelector('.url')).toBeNull();
      expect(blogContainer.querySelector('.likes')).toBeNull();
    });
    test('url and likes are rendered on btn click', () => {
      const button = screen.getByText('view');
      userEvent.click(button);
      expect(blogContainer.querySelector('.url')).not.toBeNull();
      expect(blogContainer.querySelector('.likes')).not.toBeNull();
    });
  });
  describe('button events', () => {
    test('like handler is called', () => {
      userEvent.click(screen.getByText('view'));
      const likeButton = blogContainer.querySelector('.like-btn');
      userEvent.click(likeButton);
      userEvent.click(likeButton);
      expect(handleLike.mock.calls).toHaveLength(2);
    });
  });
});
