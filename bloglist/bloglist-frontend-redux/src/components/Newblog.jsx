import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { createBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import { addBlogToUser } from '../reducers/userReducer';
import Togglable from './Togglable';
import PropTypes from 'prop-types';

const Newblog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');
  const newBlogVisible = useRef();

  const dispatch = useDispatch();
  const selector = createSelector(
    [(state) => state.users, (state) => state.login],
    (users, login) => users.find((user) => user.username === login.username)
  );
  const user = useSelector(selector);

  const handleAdd = async (event) => {
    event.preventDefault();

    const newBlog = { title, author, url };
    const result = await dispatch(createBlog(newBlog, user));

    dispatch(setNotification(result.notification, 5));

    if (result.success) {
      setTitle('');
      setAuthor('');
      setURL('');
      dispatch(addBlogToUser({ ...newBlog, id: result.id }, user));
      newBlogVisible.current.toggleVisibility();
    }
  };

  return (
    <Togglable buttonLabel='new blog' ref={newBlogVisible}>
      <form onSubmit={handleAdd}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
            id='blogTitle'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
            id='author'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='URL'
            onChange={({ target }) => setURL(target.value)}
            id='url'
          />
        </div>
        <button id='blogAddButton' type='submit'>
          create
        </button>
      </form>
    </Togglable>
  );
};

Newblog.proptypes = {
  user: PropTypes.object.isRequired
};

export default Newblog;
