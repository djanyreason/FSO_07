import { useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Table } from 'react-bootstrap';

const User = () => {
  const id = useMatch('/users/:id').params.id;
  const findUser = createSelector(
    (state) => state.users,
    (users) => users.find((user) => user.id === id)
  );
  const user = useSelector(findUser);

  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <strong>added blogs</strong>
      <Table striped>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
