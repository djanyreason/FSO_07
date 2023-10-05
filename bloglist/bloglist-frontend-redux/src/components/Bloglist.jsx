import { useSelector } from 'react-redux';
import Blog from './Blog';
import PropTypes from 'prop-types';

const Bloglist = ({ addLike, username, remove }) => {
  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((a, b) => b.likes - a.likes)
  );

  if (blogs.length === 0) return <div></div>;

  return (
    <div className='blogList'>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          like={() => addLike(blog.id)}
          deleteBlog={
            username === blog.user.username ? () => remove(blog.id) : null
          }
        />
      ))}
    </div>
  );
};

Bloglist.propTypes = {
  addLike: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired
};

export default Bloglist;
