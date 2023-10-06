import { Link } from 'react-router-dom';

const Menu = () => {
  const padding = {
    paddingRight: 5
  };

  return (
    <div>
      <Link style={padding} to='/'>
        blogs
      </Link>
      <Link style={padding} to='users'>
        user list
      </Link>
    </div>
  );
};

export default Menu;
