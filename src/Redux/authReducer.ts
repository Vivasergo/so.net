import { AuthData, InferringActionType, Nullable, ThunkType } from './../Types/types'
import { stopSubmit } from 'redux-form'
import { authAPI, captchaAPI } from '../api/api'
import { requestErrorHandler, ErrorHandlerActionType } from './appReducer'

//const action types
const SET_AUTH_USER_DATA = 'authReducer/SET_AUTH_USER_DATA'
const SET_CAPTCHA_SUCCESS = 'authReducer/SET_CAPTCHA_SUCCESS'

//types
export type AuthInitialStateType = typeof initialState
type ActionType = ReturnType<InferringActionType<typeof actions>> | ErrorHandlerActionType

type CurrentThunkType = ThunkType<ActionType>

//
let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isLogged: false,
    captchaURL: null as string | null,
}

let authReducer = (state = initialState, action: ActionType): AuthInitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case SET_CAPTCHA_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}

//
const actions = {
    setAuthUserData: (
        id: Nullable<number>,
        email: Nullable<string>,
        login: Nullable<string>,
        isLogged: boolean
    ) => {
        return {
            type: SET_AUTH_USER_DATA,
            payload: { id, email, login, isLogged },
        } as const
    },
    setCaptchaSuccess: (captchaURL: Nullable<string>) => {
        return {
            type: SET_CAPTCHA_SUCCESS,
            payload: { captchaURL },
        } as const
    },
}

//thunk creator & thunk, accepting dispatch
export const getAuthUserData = (): CurrentThunkType => async (dispatch) => {
    try {
        const { resultCode, data } = await authAPI.me()

        if (resultCode === 0) {
            let { id, email, login } = data
            dispatch(actions.setAuthUserData(id, email, login, true))
        }
    } catch (error) {
        dispatch(requestErrorHandler(error))
    }
}

export const getCaptcha = (): CurrentThunkType => async (dispatch) => {
    try {
        const { data } = await captchaAPI.getCaptcha()
        dispatch(actions.setCaptchaSuccess(data.url))
    } catch (error) {
        dispatch(requestErrorHandler(error))
    }
}

export const loginUser = (userData: AuthData) => async (dispatch: any) => {
    try {
        const { data } = await authAPI.login(userData)

        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
            dispatch(actions.setCaptchaSuccess(null))
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptcha())
            }
            //error processing: returning either message from server response if it is or
            //"common error" and any case interrupting form submitting via stopSubmit Redux Form method dispatching
            let message = data.messages.length > 0 ? data.messages[0] : 'Common error'
            dispatch(stopSubmit('loginForm', { _error: message }))
        }
    } catch (error) {
        dispatch(requestErrorHandler(error))
    }
}

export const logoutUser = (): CurrentThunkType => async (dispatch) => {
    try {
        const { data } = await authAPI.logout()

        if (data.resultCode === 0) {
            dispatch(actions.setAuthUserData(null, null, null, false))
        }
    } catch (error) {
        dispatch(requestErrorHandler(error))
    }
}

export default authReducer
