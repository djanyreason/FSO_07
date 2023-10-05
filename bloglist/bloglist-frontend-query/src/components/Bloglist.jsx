import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import Blog from './Blog';
import PropTypes from 'prop-types';

const Bloglist = ({ username }) => {
  const blogQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  });

  if (blogQuery.isLoading) return <div>loading blogs...</div>;

  const blogs = blogQuery.data;

  if (!blogs) return <div></div>;

  return (
    <div className='blogList'>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} like={() => null} deleteBlog={null} />
        ))}
    </div>
  );
};

Bloglist.propTypes = {
  username: PropTypes.string.isRequired
};

export default Bloglist;
