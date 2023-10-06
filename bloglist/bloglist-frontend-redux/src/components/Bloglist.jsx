import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import Blog from './Blog';

const Bloglist = () => {
  const generateBlogs = createSelector(
    (state) => state.blogs,
    (blogs) => [...blogs].sort((a, b) => b.likes - a.likes)
  );
  const blogs = useSelector(generateBlogs);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  if (blogs.length === 0) return <div></div>;

  return (
    <div className='blogList'>
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Bloglist;
