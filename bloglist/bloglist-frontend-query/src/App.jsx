import { useState, useEffect } from 'react';
import { useNotificationDispatch } from './Contexts/NotificationContext';
import { useUserContent, useUserDispatch } from './Contexts/UserContext';
import blogService from './services/blogs';
import loginService from './services/login';
import Bloglist from './components/Bloglist';
import Login from './components/Login';
import Newblog from './components/Newblog';
import Notification from './components/Notification';

const App = () => {
  const user = useUserContent();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      userDispatch({
        type: 'LOGIN',
        payload: { user: loggedUser }
      });
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const doLogout = () => {
    userDispatch({
      type: 'LOGOUT'
    });
    window.localStorage.removeItem('loggedBloglistUser');
    blogService.setToken(null);
    notificationDispatch({
      type: 'NOTIFY',
      payload: {
        color: 'green',
        content: `${user.name} logged out`
      }
    });
    setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
  };

  return (
    <div>
      <h2>{user === null ? '(b)log in to application' : 'blogs'}</h2>
      <Notification />
      {user === null ? (
        <div>
          <Login />
        </div>
      ) : (
        <div>
          <p>
            {user.name} logged in<button onClick={doLogout}>logout</button>
          </p>
          <Newblog />
          <Bloglist />
        </div>
      )}
    </div>
  );
};

export default App;
