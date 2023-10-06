import { useSelector } from 'react-redux';

const Userlist = () => {
  const users = useSelector(({ users }) => users);

  const thStyle = {
    textAlign: 'left'
  };

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
