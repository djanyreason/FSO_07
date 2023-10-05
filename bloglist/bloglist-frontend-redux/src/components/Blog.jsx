import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLike, removeBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import PropTypes from 'prop-types';

const Blog = ({ blog, deleteButtonVisible }) => {
  const dispatch = useDispatch();

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
  blog: PropTypes.object.isRequired,
  deleteButtonVisible: PropTypes.bool
};

export default Blog;
