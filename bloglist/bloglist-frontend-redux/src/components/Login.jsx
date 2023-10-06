import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';
import loginService from '../services/login';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userLogin = await loginService.login({ username, password });
      dispatch(login(userLogin));
      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(userLogin)
      );
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
