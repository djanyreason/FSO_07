import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Menu = () => {
  const user = useSelector(({ login }) => login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const padding = {
    paddingRight: 5
  };

  const lightText = {
    color: 'white'
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
    <Navbar collapseOnSelect expand='lg' bg='primary' data-bs-theme='primary'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#' as='span'>
            <Button
              onClick={() => {
                navigate('/');
              }}
              size='sm'
              variant='info'
            >
              blogs
            </Button>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Button
              onClick={() => {
                navigate('users');
              }}
              size='sm'
              variant='info'
            >
              user list
            </Button>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <div style={padding}>
              {user.name} logged in
              <Button onClick={doLogout} size='sm' variant='dark'>
                logout
              </Button>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
