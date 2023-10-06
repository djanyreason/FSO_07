import { useQuery } from '@tanstack/react-query';
import { useUserContent } from '../Contexts/UserContext';
import blogService from '../services/blogs';
import Blog from './Blog';

const Bloglist = () => {
  const blogQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  });

  const user = useUserContent();

  if (blogQuery.isLoading) return <div>loading blogs...</div>;

  const blogs = blogQuery.data;

  if (!blogs) return <div></div>;

  return (
    <div className='blogList'>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog={blog.user.username === user.username}
          />
        ))}
    </div>
  );
};

export default Bloglist;
