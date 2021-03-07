import { ProfileType, PhotosType, InferringActionType, ThunkType } from './../Types/types'
import { profileAPI } from '../api/api'
import { stopSubmit } from 'redux-form'
import { ErrorHandlerActionType, requestErrorHandler, serverResponseErrorHandler } from './appReducer'

//const action types
const SET_USER_PROFILE = 'profileReducer/SET_USER_PROFILE'
const SET_USER_STATUS = 'profileReducer/SET_USER_STATUS'
const UPLOAD_AVATAR_SUCCESS = 'profileReducer/UPLOAD_AVATAR_SUCCESS'
const PROFILE_UPDATE_SUCCESS = 'profileReducer/PROFILE_UPDATE_SUCCESS'
const PROFILE_UPDATE_RESET = 'profileReducer/PROFILE_UPDATE_RESET'
const CHANGE_DATA_LOADING = 'profileReducer/CHANGE_DATA_LOADING'

//types
type InitialStateType = typeof initialState
type ActionType = ReturnType<InferringActionType<typeof actions>> | ErrorHandlerActionType
type CurrentThunkType = ThunkType<ActionType>
//
let initialState = {
    profile: null as ProfileType | null,
    status: '',
    isProfileUpdated: false,
    isProfileDataLoading: false,
}

//
let profileReducer = (
    state = initialState,
    action: ActionType
): InitialStateType => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case UPLOAD_AVATAR_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: { ...action.photos } as PhotosType,
                } as ProfileType,
            }
        case PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                isProfileUpdated: true,
            }
        case PROFILE_UPDATE_RESET:
            return {
                ...state,
                isProfileUpdated: false,
            }
        case CHANGE_DATA_LOADING:
            return {
                ...state,
                isProfileDataLoading: action.payload,
            }
        default:
            return state
    }
}

//
const actions = {
    setUserProfile: (profile: ProfileType) => {
        return {
            type: SET_USER_PROFILE,
            profile,
        } as const
    },
    setUserStatus: (status: string) => {
        return {
            type: SET_USER_STATUS,
            status,
        } as const
    },
    updateAvatar: (photos: PhotosType) => {
        return {
            type: UPLOAD_AVATAR_SUCCESS,
            photos,
        } as const
    },
    setUpdateProfileSuccess: () => {
        return {
            type: PROFILE_UPDATE_SUCCESS,
        } as const
    },
    resetUpdateProfile: () => {
        return {
            type: PROFILE_UPDATE_RESET,
        } as const
    },
    changeLoadingProcess: (payload: boolean) => {
        return {
            type: CHANGE_DATA_LOADING,
            payload,
        } as const
    },
}

export const { resetUpdateProfile } = actions

//thunk
export const getProfile = (userId: number): CurrentThunkType => {
    return async (dispatch) => {
        try {
            const { data } = await profileAPI.getProfile(userId)
            dispatch(actions.setUserProfile(data))
        } catch (error) {
            dispatch(requestErrorHandler(error))
        }
    }
}

export const getStatus = (userId: number): CurrentThunkType => {
    return async (dispatch) => {
        try {
            const { data } = await profileAPI.getStatus(userId)
            dispatch(actions.setUserStatus(data))
        } catch (error) {
            dispatch(requestErrorHandler(error))
        }
    }
}
export const updateStatus = (status: string): CurrentThunkType => {
    return async (dispatch) => {
        try {
            const response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(actions.setUserStatus(status))
            } else {
                dispatch(serverResponseErrorHandler(response.data.messages[0]))
            }
        } catch (error) {
            dispatch(requestErrorHandler(error))
        }
    }
}
export const updateProfile = (formData: ProfileType): CurrentThunkType => {
    return async (dispatch) => {
        dispatch(actions.changeLoadingProcess(true))
        try {
            const response = await profileAPI.updateProfile(formData)
            if (response.data.resultCode === 0) {
                dispatch(getProfile(formData.userId))
                dispatch(actions.setUpdateProfileSuccess())
                dispatch(actions.changeLoadingProcess(false))
            } else {
                //error processing: returning either message from server response if it is or
                //"common error" and any case interrupting form submitting via stopSubmit Redux Form method dispatching
                dispatch(actions.changeLoadingProcess(false))
                let message =
                    response.data.messages.length > 0 ? response.data.messages[0] : 'Common error'
                dispatch(stopSubmit('profile-edit-form', { _error: message }))
            }
        } catch (error) {
            dispatch(actions.changeLoadingProcess(false))
            dispatch(requestErrorHandler(error))
        }
    }
}
export const uploadNewAvatar = (file: File): CurrentThunkType => {
    return async (dispatch) => {
        dispatch(actions.changeLoadingProcess(true))
        try {
            const { data } = await profileAPI.uploadNewAvatar(file)
            if (data.resultCode === 0) {
                dispatch(actions.updateAvatar(data.data.photos))
            } else {
                dispatch(serverResponseErrorHandler(data.messages[0]))
            }
            dispatch(actions.changeLoadingProcess(false))
        } catch (error) {
            dispatch(actions.changeLoadingProcess(false))
            dispatch(requestErrorHandler(error))
        }
    }
}

export default profileReducer
