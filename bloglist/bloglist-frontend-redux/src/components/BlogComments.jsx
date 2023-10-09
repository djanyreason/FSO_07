import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commmentOnBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Form, Button } from 'react-bootstrap';

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
      <Form onSubmit={handleAdd} style={formStyle}>
        <Form.Group>
          <Form.Control
            type='text'
            name='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button variant='primary' type='submit'>
            add comment
          </Button>
        </Form.Group>
      </Form>
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
