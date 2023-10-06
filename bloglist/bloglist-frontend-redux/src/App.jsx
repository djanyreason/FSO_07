import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/userReducer';
import { login } from './reducers/loginReducer';
import Bloglist from './components/Bloglist';
import Login from './components/Login';
import Newblog from './components/Newblog';
import Notification from './components/Notification';
import Menu from './components/Menu';
import Userlist from './components/Userlist';
import User from './components/User';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(login(loggedUser));
    }
  }, []);

  const user = useSelector(({ login }) => login);

  return (
    <div>
      <h2>{user === null ? '(b)log in to application' : 'blogs'}</h2>
      <Notification />
      <Login />
      {user === null ? (
        <div></div>
      ) : (
        <div>
          <Menu />
          <br />
          <Routes>
            <Route path='/users/:id' element={<User />} />
            <Route path='/users' element={<Userlist />} />
            <Route
              path='/'
              element={
                <div>
                  <Newblog user={user} />
                  <br />
                  <Bloglist username={user.username} />
                </div>
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
