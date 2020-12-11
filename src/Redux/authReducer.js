import { authAPI } from "../api/api";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";

let initialState = {
  id: null,
  email: null,
  login: null,
  isLogged: false,
};

let authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.payLoad,
      };
  
    default:
      return state;
  }
};

export const setAuthUserData = (id, email, login, isLogged) => {
  return {
    type: SET_AUTH_USER_DATA,
    payLoad: { id, email, login, isLogged },
  };
};  



//thunk creator & thunk, accepting dispatch
export const getAuthUserData = () => (dispatch) => {

  return authAPI.me().then((responseData) => {
    
    if (responseData.resultCode === 0) {
      let { id, email, login } = responseData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
  });
};
export const loginUser = (userData) => (dispatch) => {

  return authAPI.login(userData).then((responseData) => {
    
    if (responseData.resultCode === 0) {
       dispatch(getAuthUserData());
    }
  });
};
export const logoutUser = () => (dispatch) => {

  return authAPI.logout().then((responseData) => {
    
    if (responseData.resultCode === 0) {
       dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export default authReducer;
