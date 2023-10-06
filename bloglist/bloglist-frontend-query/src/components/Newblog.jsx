import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from '../Contexts/NotificationContext';
import { useUserContent } from '../Contexts/UserContext';
import blogService from '../services/blogs';
import Togglable from '../components/Togglable';

const Newblog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');
  const newBlogVisible = useRef();

  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const user = useUserContent();

  const newBlogMutation = useMutation({
    mutationFn: blogService.addBlog,
    onSuccess: (newBlog) => {
      const blogToAdd = {
        ...newBlog,
        user
      };
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] });
      queryClient.setQueryData(
        { queryKey: ['blogs'] },
        blogs.concat(blogToAdd)
      );
      setAuthor('');
      setTitle('');
      setURL('');
      notificationDispatch({
        type: 'NOTIFY',
        payload: {
          color: 'green',
          content: `a new blog ${newBlog.title} by ${newBlog.author} added`
        }
      });
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
      newBlogVisible.current.toggleVisibility();
    },
    onError: (error) => {
      notificationDispatch({
        type: 'NOTIFY',
        payload: {
          color: 'red',
          content: `blog addition failed due to error: ${error.response.data.error}`
        }
      });
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
    }
  });

  const handleAdd = (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url
    };
    newBlogMutation.mutate(newBlog);
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

export default Newblog;
