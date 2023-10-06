import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';

const Menu = () => {
  const user = useSelector(({ login }) => login);
  const dispatch = useDispatch();

  const padding = {
    paddingRight: 5
  };

  const menuBarStyle = {
    background: 'silver',
    padding: 5
  };

  const doLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('loggedBloglistUser');
    dispatch(
      setNotification(
        {
          color: 'green',
          content: `${user.name} logged out`
        },
        5
      )
    );
  };

  return (
    <div style={menuBarStyle}>
      <Link style={padding} to='/'>
        blogs
      </Link>
      <Link style={padding} to='users'>
        user list
      </Link>
      {user.name} logged in<button onClick={doLogout}>logout</button>
    </div>
  );
};

export default Menu;
