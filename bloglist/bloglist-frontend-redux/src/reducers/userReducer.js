import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    updateUser(state, action) {
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    }
  }
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(userSlice.actions.setUsers(users));
  };
};

export const addBlogToUser = (blog, user) => {
  return (dispatch) => {
    const updatedUser = { ...user, blogs: user.blogs.concat(blog) };
    dispatch(userSlice.actions.updateUser(updatedUser));
  };
};

export const removeBlogFromUser = (blog, user) => {
  return (dispatch) => {
    const updatedUser = {
      ...user,
      blogs: user.blogs.filter((aBlog) => aBlog.id !== blog.id)
    };
    dispatch(userSlice.actions.updateUser(updatedUser));
  };
};

export default userSlice.reducer;
