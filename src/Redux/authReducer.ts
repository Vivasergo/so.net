import { AuthData } from './../Types/types';
import { AppStateType } from './redux-store';
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI, captchaAPI } from "../api/api";
import { requestErrorHandler, ErrorHandlerActionType } from "./appReducer";

const SET_AUTH_USER_DATA = "authReducer/SET_AUTH_USER_DATA";
const SET_CAPTCHA_SUCCESS = "authReducer/SET_CAPTCHA_SUCCESS";

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isLogged: false,
  captchaURL: null as string | null,
};

export type AuthInitialStateType = typeof initialState;

type ActionType =
  | SetAuthUserDataType
  | SetCaptchaSuccessType
  | ErrorHandlerActionType
  

let authReducer = (state = initialState, action: ActionType): AuthInitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
    case SET_CAPTCHA_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

type SetAuthUserDataPayloadType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isLogged: boolean;
};

type SetAuthUserDataType = {
  type: typeof SET_AUTH_USER_DATA;
  payload: SetAuthUserDataPayloadType;
};
export const setAuthUserData = (
	id: number | null,
	email: string | null,
	login: string | null,
	isLogged: boolean
): SetAuthUserDataType => {
  return {
    type: SET_AUTH_USER_DATA,
    payload: { id, email, login, isLogged },
  };
};

type SetCaptchaSuccessType = {
  type: typeof SET_CAPTCHA_SUCCESS;
  payload: { captchaURL: string | null };
};
export const setCaptchaSuccess = (
  captchaURL: string | null
): SetCaptchaSuccessType => {
  return {
    type: SET_CAPTCHA_SUCCESS,
    payload: { captchaURL },
  };
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>;

//thunk creator & thunk, accepting dispatch
export const getAuthUserData = (): ThunkType => async (dispatch) => {
  try {
    const { resultCode, data } = await authAPI.me();

    if (resultCode === 0) {
      let { id, email, login } = data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  } catch (error) {
    dispatch(requestErrorHandler(error));
  }
};

export const getCaptcha = (): ThunkType => async (dispatch) => {
  try {
    const { data } = await captchaAPI.getCaptcha();
    dispatch(setCaptchaSuccess(data.url));
  } catch (error) {
    dispatch(requestErrorHandler(error));
  }
};

export const loginUser = (userData: AuthData) => async (dispatch:any) => {
  try {
    const { data } = await authAPI.login(userData);

    if (data.resultCode === 0) {
      dispatch(getAuthUserData());
      dispatch(setCaptchaSuccess(null));
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptcha());
      }
      //error processing: returning either message from server response if it is or
      //"common error" and any case interrupting form submitting via stopSubmit Redux Form method dispatching
      let message =
        data.messages.length > 0 ? data.messages[0] : "Common error";
      dispatch(stopSubmit("loginForm", { _error: message }));
    }
  } catch (error) {
    dispatch(requestErrorHandler(error));
  }
};

export const logoutUser = (): ThunkType => async (dispatch) => {
  try {
    const { data } = await authAPI.logout();

    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  } catch (error) {
    dispatch(requestErrorHandler(error));
  }
};

export default authReducer;
