import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import Togglable from './Togglable';
import PropTypes from 'prop-types';

const Newblog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');
  const newBlogVisible = useRef();

  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  const handleAdd = async (event) => {
    event.preventDefault();

    const result = await dispatch(
      createBlog(
        {
          title: title,
          author: author,
          url: url
        },
        user
      )
    );

    dispatch(setNotification(result.notification, 5));

    if (result.success) {
      setTitle('');
      setAuthor('');
      setURL('');
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
