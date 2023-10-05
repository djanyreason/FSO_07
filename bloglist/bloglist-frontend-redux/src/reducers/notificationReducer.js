import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    notify(state, action) {
      const id = state.length === 0 ? 0 : state[state.length - 1].id + 1;
      state.push({ content: action.payload, id: id });
    },
    removeNotification(state, action) {
      return state.filter((note) => note.id !== action.payload);
    }
  }
});

export const setNotification = (note, time) => {
  return (dispatch, getState) => {
    dispatch(notificationSlice.actions.notify(note));
    const notifications = getState().notification;
    if (notifications.length < 1) return null;
    const id = notifications[notifications.length - 1].id;
    setTimeout(
      () => dispatch(notificationSlice.actions.removeNotification(id)),
      time * 1000
    );
  };
};

export default notificationSlice.reducer;
