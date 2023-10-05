import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return null;
    }
  }
});

export const setUser = (user) => {
  return (dispatch) => {
    dispatch(userReducer.actions.login(user));
    blogService.setToken(user.token);
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(userReducer.actions.logout());
    blogService.setToken(null);
  };
};

export default userReducer.reducer;
