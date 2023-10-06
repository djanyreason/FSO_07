import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useUserDispatch } from '../Contexts/UserContext';
import { useNotificationDispatch } from '../Contexts/NotificationContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      userDispatch({
        type: 'LOGIN',
        payload: { user }
      });
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      notificationDispatch({
        type: 'NOTIFY',
        payload: {
          color: 'green',
          content: `${user.name} (b)logged in`
        }
      });
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
    } catch (exception) {
      notificationDispatch({
        type: 'NOTIFY',
        payload: {
          color: 'red',
          content: 'wrong username or password'
        }
      });
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
