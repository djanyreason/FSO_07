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
    },
    likeBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload ? { ...blog, likes: blog.likes + 1 } : blog
      );
    },
    commentBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, comments: blog.comments.concat(action.payload.comment) }
          : blog
      );
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    }
  }
});

const { addBlog, setBlogs, likeBlog, commentBlog, deleteBlog } =
  blogSlice.actions;

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
        id: newBlog.id,
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

export const addLike = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.updateBlog({ ...blog, likes: blog.likes + 1 });
      dispatch(likeBlog(blog.id));
      return {
        success: true,
        notification: {
          color: 'green',
          content: `Like added to blog ${blog.title}`
        }
      };
    } catch (exception) {
      return {
        success: false,
        notification: {
          color: 'red',
          content: `blog update failed due to error: ${exception.response.data.error}`
        }
      };
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog.id);
      dispatch(deleteBlog(blog.id));
      return {
        success: true,
        notification: {
          color: 'green',
          content: `Blog ${blog.title} by ${blog.author} removed`
        }
      };
    } catch (exception) {
      return {
        success: false,
        notification: {
          color: 'red',
          content: `blog deletion failed due to error: ${exception.response.data.error}`
        }
      };
    }
  };
};

export const commmentOnBlog = (comment, blog) => {
  const id = blog.id;
  return async (dispatch) => {
    try {
      await blogService.addComment(id, comment);
      dispatch(commentBlog({ id, comment }));
      return {
        success: true,
        notification: {
          color: 'green',
          content: `Comment '${comment}' added to blog ${blog.title}`
        }
      };
    } catch (exception) {
      return {
        success: false,
        notification: {
          color: 'red',
          content: `comment failed due to error: ${exception.response.data.error}`
        }
      };
    }
  };
};

export default blogSlice.reducer;
