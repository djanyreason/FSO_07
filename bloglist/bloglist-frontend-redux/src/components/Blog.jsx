import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import { removeBlogFromUser } from '../reducers/userReducer';
import PropTypes from 'prop-types';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ users }) =>
    users.find((user) => user.id === blog.user.id)
  );
  const login = useSelector(({ login }) => login);
  const deleteButtonVisible = user.username === login.username;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [hidden, setHidden] = useState('true');
  const toggleHidden = () => setHidden(!hidden);
  const hideWhenHidden = { display: hidden ? 'none' : '' };

  const like = async () => {
    const result = await dispatch(addLike(blog));
    dispatch(setNotification(result.notification, 5));
  };

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const result = await dispatch(removeBlog(blog));
      dispatch(setNotification(result.notification, 5));
      dispatch(removeBlogFromUser(blog, user));
    }
  };

  return (
    <div className='aBlog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleHidden} style={{ marginLeft: 10 }}>
        {hidden ? 'view' : 'hide'}
      </button>
      <div className='url' style={hideWhenHidden}>
        {blog.url}
      </div>
      <div className='likes' style={hideWhenHidden}>
        likes {blog.likes}
        <button className='likeButton' onClick={like}>
          like
        </button>
      </div>
      <div className='userName' style={hideWhenHidden}>
        {blog.user.name}
      </div>
      {!deleteButtonVisible ? (
        <></>
      ) : (
        <button
          className='deleteButton'
          onClick={deleteBlog}
          style={hideWhenHidden}
        >
          remove
        </button>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;
