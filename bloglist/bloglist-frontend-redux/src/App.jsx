import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import blogService from './services/blogs';
import loginService from './services/login';
import Bloglist from './components/Bloglist';
import Login from './components/Login';
import Newblog from './components/Newblog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const newBlogVisible = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

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
      dispatch(
        setNotification(
          {
            color: 'green',
            content: `${userLogin.name} (b)logged in`
          },
          5
        )
      );
    } catch (exception) {
      dispatch(
        setNotification(
          {
            color: 'red',
            content: 'wrong username or password'
          },
          5
        )
      );
    }
  };

  const doLogout = () => {
    dispatch(
      setNotification(
        {
          color: 'green',
          content: `${user.name} logged out`
        },
        5
      )
    );
    window.localStorage.removeItem('loggedBloglistUser');
    blogService.setToken(null);
    setUser(null);
  };

  const addBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.addBlog(newBlog);
      const id = addedBlog.user;
      addedBlog.user = {
        id: id,
        username: user.username,
        name: user.name
      };
      setBlogs(blogs.concat(addedBlog));
      dispatch(
        setNotification(
          {
            color: 'green',
            content: `a new blog ${addedBlog.title} by ${addedBlog.author} added`
          },
          5
        )
      );
      newBlogVisible.current.toggleVisibility();
      return true;
    } catch (exception) {
      dispatch(
        setNotification(
          {
            color: 'red',
            content: `blog addition failed due to error: ${exception.response.data.error}`
          },
          5
        )
      );
      return false;
    }
  };

  const addLike = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const likedBlog = { ...blog, likes: blog.likes + 1 };

    try {
      await blogService.updateBlog(likedBlog);
      setBlogs(blogs.map((b) => (b.id !== id ? b : likedBlog)));
      dispatch(
        setNotification(
          {
            color: 'green',
            content: `Like added to blog ${likedBlog.title}`
          },
          5
        )
      );
    } catch (exception) {
      dispatch(
        setNotification(
          {
            color: 'red',
            content: `blog update failed due to error: ${exception.response.data.error}`
          },
          5
        )
      );
      return false;
    }
  };

  const removeBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        dispatch(
          setNotification(
            {
              color: 'green',
              content: `Blog ${blog.title} by ${blog.author} removed`
            },
            5
          )
        );
      } catch (exception) {
        dispatch(
          setNotification(
            {
              color: 'red',
              content: `blog update failed due to error: ${exception.response.data.error}`
            },
            5
          )
        );
        return false;
      }
    }
  };

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
          <Togglable buttonLabel='new blog' ref={newBlogVisible}>
            <Newblog addBlog={addBlog} />
          </Togglable>
          <Bloglist
            blogs={blogs}
            addLike={addLike}
            username={user.username}
            remove={removeBlog}
          />
        </div>
      )}
    </div>
  );
};

export default App;
