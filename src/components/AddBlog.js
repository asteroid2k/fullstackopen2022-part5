import { useState } from 'react';

const AddBlog = ({ handleSubmit }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const clearForm = () => {
    setAuthor('');
    setTitle('');
    setUrl('');
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ author, title, url });
        clearForm();
      }}
    >
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
};
export default AddBlog;
