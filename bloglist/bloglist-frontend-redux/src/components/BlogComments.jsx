import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commmentOnBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogComments = ({ blog }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const hideStyle = blog.comments.length === 0 ? { display: 'none' } : {};
  const formStyle = { marginTop: 15 };

  const handleAdd = async (event) => {
    event.preventDefault();

    const result = await dispatch(commmentOnBlog(comment, blog));

    dispatch(setNotification(result.notification, 5));

    if (result.success) setComment('');
  };

  return (
    <div>
      <h3 style={hideStyle}>comments</h3>
      <form onSubmit={handleAdd} style={formStyle}>
        <div>
          <input
            type='text'
            value={comment}
            name='Comment'
            onChange={({ target }) => setComment(target.value)}
          />
          <button type='submit'>add comment</button>
        </div>
      </form>
      <ul style={hideStyle}>
        {blog.comments.map((comment) => (
          <li key={comment} style={hideStyle}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

BlogComments.proptypes = {
  blog: PropTypes.object.isRequired
};

export default BlogComments;
