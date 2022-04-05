import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/notification';
import AddBlog from './components/AddBlog';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState(null);
  const [notifType, setNotifType] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((data) => setBlogs(sortPosts(data)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const authUser = JSON.parse(loggedUserJSON);
      setUser(authUser);
      blogService.setToken(authUser.token);
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const authUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(authUser)
      );
      blogService.setToken(authUser.token);
      setUser(authUser);
      notify('Authenticated', 'success');
    } catch (error) {
      if (error.response) {
        const { error: errMsg } = error.response.data;
        notify(errMsg, 'error');
        return;
      }
      console.log(error);
    }
  };
  const createPost = async ({ title, author, url }) => {
    try {
      const newPost = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs(blogs.concat(newPost));
      notify('Blog added', 'success');
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      if (error.response) {
        const { error: errMsg } = error.response.data;
        notify(errMsg, 'error');
        return;
      }
      console.log(error);
    }
  };
  const likePost = async ({ id, likes }) => {
    try {
      const edited = await blogService.edit({
        id,
        likes: likes + 1,
      });
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : edited)));
      notify('Blog liked', 'success');
    } catch (error) {
      if (error.response) {
        const { error: errMsg } = error.response.data;
        notify(errMsg, 'error');
        return;
      }
      console.log(error);
    }
  };
  const deletePost = async ({ id }) => {
    try {
      const proceed = window.confirm('Are you sure you want to delete?');
      if (!proceed) {
        return;
      }
      await blogService.remove({
        id,
      });
      setBlogs(blogs.filter((blog) => blog.id !== id));
      notify('Blog removed', 'success');
    } catch (error) {
      if (error.response) {
        const { error: errMsg } = error.response.data;
        notify(errMsg || 'An error occured', 'error');
        return;
      }
      console.log(error);
    }
  };

  const notify = (message, type) => {
    setNotification(message);
    setNotifType(type);
    setTimeout(() => {
      setNotification(null);
      setNotifType(null);
    }, 4000);
  };
  const logout = () => {
    window.localStorage.clear();
  };

  const sortPosts = (arr) => {
    return arr.sort((a, b) => {
      if (a.likes > b.likes) {
        return -1;
      }
      if (a.likes < b.likes) {
        return 1;
      }
      return 0;
    });
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} type={notifType} />
      {!('token' in user) ? (
        <Togglable buttonLabel="Login">
          <Login handleSubmit={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <p>{user.username}</p>
            <button onClick={logout}>Logout</button>
          </div>
          <Togglable buttonLabel="New Post" ref={blogFormRef}>
            <AddBlog handleSubmit={createPost} />
          </Togglable>
        </div>
      )}

      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={likePost}
          handleDelete={deletePost}
        />
      ))}
    </div>
  );
};

export default App;
