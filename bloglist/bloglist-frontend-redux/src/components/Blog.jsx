import { useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import BlogDetails from './BlogDetails';
import BlogComments from './BlogComments';

const Blog = () => {
  const id = useMatch('/blogs/:id').params.id;
  const findBlog = createSelector(
    (state) => state.blogs,
    (blogs) => blogs.find((blog) => blog.id === id)
  );
  const blog = useSelector(findBlog);

  if (!blog) return null;

  return (
    <div>
      <BlogDetails blog={blog} />
      <BlogComments blog={blog} />
    </div>
  );
};

export default Blog;
