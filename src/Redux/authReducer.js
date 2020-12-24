import { stopSubmit } from "redux-form";
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
export const getAuthUserData = () => async (dispatch) => {

  const responseData = await authAPI.me();
  if (responseData.resultCode === 0) {
    let { id, email, login } = responseData.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};
export const loginUser = (userData) => (dispatch) => {

  authAPI.login(userData).then((responseData) => {
    
    if (responseData.resultCode === 0) {
       dispatch(getAuthUserData());
    }else{
      let message =
        responseData.messages.length > 0
          ? responseData.messages[0]
          : "Common error";
      dispatch(stopSubmit("loginForm", { _error: message }));
    }
  });
};
export const logoutUser = () => (dispatch) => {

  authAPI.logout().then((responseData) => {
    
    if (responseData.resultCode === 0) {
       dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export default authReducer;
