import { useState, useEffect } from 'react';
import { useNotificationDispatch } from './Contexts/NotificationContext';
import blogService from './services/blogs';
import loginService from './services/login';
import Bloglist from './components/Bloglist';
import Login from './components/Login';
import Newblog from './components/Newblog';
import Notification from './components/Notification';

const App = () => {
  const [user, setUser] = useState(null);
  const notificationDispatch = useNotificationDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleMessage = (newMessage) => {
    notificationDispatch({
      type: 'NOTIFY',
      payload: newMessage
    });
    setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
  };

  const doLogin = async (credentials) => {
    if (user) return null;

    try {
      const userLogin = await loginService.login(credentials);
      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(userLogin)
      );
      blogService.setToken(userLogin.token);
      setUser(userLogin);
      handleMessage({
        color: 'green',
        content: `${userLogin.name} (b)logged in`
      });
    } catch (exception) {
      handleMessage({
        color: 'red',
        content: 'wrong username or password'
      });
    }
  };

  const doLogout = () => {
    handleMessage({
      color: 'green',
      content: `${user.name} logged out`
    });
    window.localStorage.removeItem('loggedBloglistUser');
    blogService.setToken(null);
    setUser(null);
  };

  /*
  const addLike = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const likedBlog = { ...blog, likes: blog.likes + 1 };

    try {
      await blogService.updateBlog(likedBlog);
      setBlogs(blogs.map((b) => (b.id !== id ? b : likedBlog)));
      handleMessage({
        color: 'green',
        content: `Like added to blog ${likedBlog.title}`
      });
    } catch (exception) {
      handleMessage({
        color: 'red',
        content: `blog update failed due to error: ${exception.response.data.error}`
      });
      return false;
    }
  };

  const removeBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        handleMessage({
          color: 'green',
          content: `Blog ${blog.title} by ${blog.author} removed`
        });
      } catch (exception) {
        handleMessage({
          color: 'red',
          content: `blog update failed due to error: ${exception.response.data.error}`
        });
        return false;
      }
    }
  };
  */

  return (
    <div>
      <h2>{user === null ? '(b)log in to application' : 'blogs'}</h2>
      <Notification />
      {user === null ? (
        <div>
          <Login doLogin={doLogin} />
        </div>
      ) : (
        <div>
          <p>
            {user.name} logged in<button onClick={doLogout}>logout</button>
          </p>
          <Newblog user={user} />
          <Bloglist username={user.username} />
        </div>
      )}
    </div>
  );
};

export default App;
