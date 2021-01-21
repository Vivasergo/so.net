import { stopSubmit } from "redux-form";
import { authAPI, captchaAPI } from "../api/api";
import { requestErrorHandler } from "./appReducer";

const SET_AUTH_USER_DATA = "authReducer/SET_AUTH_USER_DATA";
const SET_CAPTCHA_SUCCESS = "authReducer/SET_CAPTCHA_SUCCESS";

let initialState = {
	id: null,
	email: null,
	login: null,
	isLogged: false,
	captchaURL: null,
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
		payLoad: { id, email, login, isLogged },
	};
};
export const setCaptchaSuccess = (captchaURL) => {
	return {
		type: SET_CAPTCHA_SUCCESS,
		payLoad: { captchaURL },
	};
};

//thunk creator & thunk, accepting dispatch
export const getAuthUserData = () => async (dispatch) => {
	try {
		const {
			data: { resultCode, data },
		} = await authAPI.me();

		if (resultCode === 0) {
			let { id, email, login } = data;
			dispatch(setAuthUserData(id, email, login, true));
		}
	} catch (error) {
		dispatch(requestErrorHandler(error));
	}
};

export const getCaptcha = () => async (dispatch) => {
	try {
		const { data } = await captchaAPI.getCaptcha();
		dispatch(setCaptchaSuccess(data.url));
	} catch (error) {
		dispatch(requestErrorHandler(error));
	}
};

export const loginUser = (userData) => async (dispatch) => {
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

export const logoutUser = () => async (dispatch) => {
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
