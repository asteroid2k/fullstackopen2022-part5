import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [expand, setExpand] = useState(false);
  const { id, likes } = blog;
  return (
    <div className="blog-post">
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <p className="title">{blog.title}</p>
        <p className="author">by {blog.author}</p>
        <button onClick={() => setExpand(!expand)}>
          {expand ? 'hide' : 'view'}
        </button>
      </div>
      {expand && (
        <div>
          <p>{blog.url}</p>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <p>likes {blog.likes}</p>{' '}
            <button onClick={() => handleLike({ id, likes })}>like</button>
          </span>
          <p>{blog.user.username}</p>
          <button
            style={{ border: '1px solid red' }}
            onClick={() => handleDelete({ id })}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default Blog;
