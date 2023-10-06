import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const loginReducer = createSlice({
  name: 'login',
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

export const login = (user) => {
  return (dispatch) => {
    dispatch(loginReducer.actions.login(user));
    blogService.setToken(user.token);
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(loginReducer.actions.logout());
    blogService.setToken(null);
  };
};

export default loginReducer.reducer;
