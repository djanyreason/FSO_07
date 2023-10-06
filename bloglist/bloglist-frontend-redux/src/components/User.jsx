import { useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

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
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
