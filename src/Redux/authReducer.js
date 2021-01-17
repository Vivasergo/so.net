import {stopSubmit} from "redux-form";
import {authAPI, captchaAPI} from "../api/api";

const SET_AUTH_USER_DATA = "authReducer/SET_AUTH_USER_DATA";
const SET_CAPTCHA_SUCCESS = "authReducer/SET_CAPTCHA_SUCCESS";


let initialState = {
    id: null,
    email: null,
    login: null,
    isLogged: false,
    captchaURL: null
};

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case SET_CAPTCHA_SUCCESS:
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
        payLoad: {id, email, login, isLogged},
    };
};
export const setCaptchaSuccess = (captchaURL) => {
    return {
        type: SET_CAPTCHA_SUCCESS,
        payLoad: {captchaURL},
    };
};

//thunk creator & thunk, accepting dispatch
export const getAuthUserData = () => async (dispatch) => {

    const responseData = await authAPI.me();
    if (responseData.resultCode === 0) {
        let {id, email, login} = responseData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};
export const getCaptcha = () => async (dispatch) => {

    const responseData = await captchaAPI.getCaptcha();
        dispatch(setCaptchaSuccess(responseData.url));
};

export const loginUser = (userData) => async (dispatch) => {

    const responseData = await authAPI.login(userData);

    if (responseData.resultCode === 0) {
        dispatch(getAuthUserData());
        dispatch(setCaptchaSuccess(null));
    } else {
        if(responseData.resultCode === 10){
            dispatch(getCaptcha())
        }
        //error processing: returning either message from server response if it is or
        //"common error" and any case interrupting form submitting via stopSubmit Redux Form method dispatching
        let message =
            responseData.messages.length > 0
                ? responseData.messages[0]
                : "Common error";
        dispatch(stopSubmit("loginForm", {_error: message}));
    }
};

export const logoutUser = () => async (dispatch) => {

   const responseData = await authAPI.logout();

        if (responseData.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
};

export default authReducer;
