/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from 'react';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload.user;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContent = () => {
  const CND = useContext(UserContext);
  return CND[0];
};

export const useUserDispatch = () => {
  const CND = useContext(UserContext);
  return CND[1];
};

export default UserContext;
