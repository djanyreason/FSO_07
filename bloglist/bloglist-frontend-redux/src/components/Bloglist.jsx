import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import Blog from './Blog';

const Bloglist = () => {
  const generateBlogs = createSelector(
    (state) => state.blogs,
    (blogs) => [...blogs].sort((a, b) => b.likes - a.likes)
  );
  const blogs = useSelector(generateBlogs);
  const username = useSelector(({ user }) => user.username);

  if (blogs.length === 0) return <div></div>;

  return (
    <div className='blogList'>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          deleteButtonVisible={username === blog.user.username}
        />
      ))}
    </div>
  );
};

export default Bloglist;
