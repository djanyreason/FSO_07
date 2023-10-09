import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Bloglist = () => {
  const generateBlogs = createSelector(
    (state) => state.blogs,
    (blogs) => [...blogs].sort((a, b) => b.likes - a.likes)
  );
  const blogs = useSelector(generateBlogs);

  if (blogs.length === 0) return <div></div>;

  return (
    <Table striped>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Bloglist;
