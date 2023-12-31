import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';
import loginService from '../services/login';
import { Form, Button } from 'react-bootstrap';

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant='primary' type='submit'>
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
