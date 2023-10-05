import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    }
  }
});

const { addBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content, user) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.addBlog(content);
      const id = newBlog.user;
      newBlog.user = {
        id: id,
        username: user.username,
        name: user.name
      };
      dispatch(addBlog(newBlog));

      return {
        success: true,
        notification: {
          color: 'green',
          content: `a new blog ${newBlog.title} by ${newBlog.author} added`
        }
      };
    } catch (exception) {
      return {
        success: false,
        notification: {
          color: 'red',
          content: `blog addition failed due to error: ${exception.response.data.error}`
        }
      };
    }
  };
};

export default blogSlice.reducer;