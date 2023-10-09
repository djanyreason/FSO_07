import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addLike, removeBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import { removeBlogFromUser } from '../reducers/userReducer';
import { Button } from 'react-bootstrap';

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(({ users }) =>
    users.find((user) => user.id === blog.user.id)
  );
  const login = useSelector(({ login }) => login);

  const deleteButtonVisible = user && user.username === login.username;

  const like = async () => {
    const result = await dispatch(addLike(blog));
    dispatch(setNotification(result.notification, 5));
  };

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const result = await dispatch(removeBlog(blog));
      dispatch(setNotification(result.notification, 5));
      dispatch(removeBlogFromUser(blog, user));
      navigate('/');
    }
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url} target='_blank' rel='noreferrer'>
          {blog.url}
        </a>
      </div>
      <div>
        likes {blog.likes}
        <Button variant='outline-success' size='sm' onClick={like}>
          like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>
      {!deleteButtonVisible ? (
        <></>
      ) : (
        <Button onClick={deleteBlog} variant='outline-danger' size='sm'>
          remove
        </Button>
      )}
    </div>
  );
};

BlogDetails.proptypes = {
  blog: PropTypes.object.isRequired
};

export default BlogDetails;
