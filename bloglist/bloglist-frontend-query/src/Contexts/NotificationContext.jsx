/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return {
        content: action.payload.content,
        color: action.payload.color,
        count: state.count >= 0 ? state.count + 1 : 1
      };
    case 'REMOVE':
      return state.count <= 1 ? {} : { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    {}
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContent = () => {
  const CND = useContext(NotificationContext);
  return CND[0];
};

export const useNotificationDispatch = () => {
  const CND = useContext(NotificationContext);
  return CND[1];
};

export default NotificationContext;
