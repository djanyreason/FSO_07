import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { useNotificationDispatch } from '../Contexts/NotificationContext';

const Blog = ({ blog, deleteBlog }) => {
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

  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const likeMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: (likedBlog) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] });
      queryClient.setQueryData(
        { queryKey: ['blogs'] },
        blogs.map((aBlog) =>
          aBlog.id === likedBlog.id ? { ...blog, likes: blog.likes + 1 } : aBlog
        )
      );
      notificationDispatch({
        type: 'NOTIFY',
        payload: {
          color: 'green',
          content: `Like added to blog ${likedBlog.title}`
        }
      });
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
    },
    onError: (error) => {
      notificationDispatch({
        type: 'NOTIFY',
        payload: {
          color: 'red',
          content: `blog update failed due to error: ${error.response.data.error}`
        }
      });
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
    }
  });

  const doLike = () => {
    likeMutation.mutate({ ...blog, likes: blog.likes + 1 });
  };

  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (likedBlog) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] });
      queryClient.setQueryData(
        { queryKey: ['blogs'] },
        blogs.filter((aBlog) => aBlog.id !== blog.id)
      );
      notificationDispatch({
        type: 'NOTIFY',
        payload: {
          color: 'green',
          content: `Blog ${blog.title} by ${blog.author} removed`
        }
      });
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
    },
    onError: (error) => {
      notificationDispatch({
        type: 'NOTIFY',
        payload: {
          color: 'red',
          content: `blog update failed due to error: ${error.response.data.error}`
        }
      });
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
    }
  });

  const doDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteMutation.mutate(blog.id);
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
        <button className='likeButton' onClick={doLike}>
          like
        </button>
      </div>
      <div className='userName' style={hideWhenHidden}>
        {blog.user.name}
      </div>
      {!deleteBlog ? (
        <></>
      ) : (
        <button
          className='deleteButton'
          onClick={doDelete}
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
  deleteBlog: PropTypes.bool
};

export default Blog;
