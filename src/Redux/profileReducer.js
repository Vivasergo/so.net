import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {errorOccurred} from "./appReducer";

const SET_USER_PROFILE = "profileReducer/SET_USER_PROFILE";
const SET_USER_STATUS = "profileReducer/SET_USER_STATUS";
const UPLOAD_AVATAR_SUCCESS = "profileReducer/UPLOAD_AVATAR_SUCCESS";
const PROFILE_UPDATE_SUCCESS = "profileReducer/PROFILE_UPDATE_SUCCESS";
const PROFILE_UPDATE_RESET = "profileReducer/PROFILE_UPDATE_RESET";
const CHANGE_DATA_LOADING = "profileReducer/CHANGE_DATA_LOADING"

let initialState = {
    profile: null,
    status: "",
    isProfileUpdated: false,
    isProfileDataLoading: false
};

let profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            };
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status,
            };
        case UPLOAD_AVATAR_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: {...action.photos}},
            };
        case PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                isProfileUpdated: true
            };
        case PROFILE_UPDATE_RESET:
            return {
                ...state,
                isProfileUpdated: false
            };
        case CHANGE_DATA_LOADING:
            return {
                ...state,
                isProfileDataLoading: action.payload
            };


        default:
            return state;
    }
};

export const setUserProfile = (profile) => {
    return ({
        type: SET_USER_PROFILE,
        profile
    })
}
export const setUserStatus = (status) => {
    return {
        type: SET_USER_STATUS,
        status,
    };
}
export const updateAvatar = (photos) => {
    return {
        type: UPLOAD_AVATAR_SUCCESS,
        photos,
    };
}
export const setUpdateProfileSuccess = () => {
    return {
        type: PROFILE_UPDATE_SUCCESS,
    };
}
export const resetUpdateProfile = () => {
    return {
        type: PROFILE_UPDATE_RESET,
    };
}
export const changeLoadingProcess = (payload) => {
    return {
        type: CHANGE_DATA_LOADING,
        payload
    };
}


//thunk
export const getProfile = (userId) => {

    return async (dispatch) => {

            const profileData = await profileAPI.getProfile(userId);
            dispatch(setUserProfile(profileData));

    }
}

export const getStatus = (userId) => {
    return async (dispatch) => {
        // try{
            const status = await profileAPI.getStatus(userId)
            dispatch(setUserStatus(status));
        // }
        // catch (e) {
        //     console.error(e);
        // }

    };
}
export const updateStatus = (status) => {
    return async (dispatch) => {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    };
}
export const updateProfile = (formData) => {
    return async (dispatch) => {
        dispatch(changeLoadingProcess(true));
        const response = await profileAPI.updateProfile(formData)
        if (response.data.resultCode === 0) {
            dispatch(getProfile(formData.userId));
            dispatch(setUpdateProfileSuccess());
            dispatch(changeLoadingProcess(false));
        } else {
//error processing: returning either message from server response if it is or
            //"common error" and any case interrupting form submitting via stopSubmit Redux Form method dispatching
            dispatch(changeLoadingProcess(false));
            let message =
                response.data.messages.length > 0
                    ? response.data.messages[0]
                    : "Common error";
            dispatch(stopSubmit("profile-edit-form", {_error: message}));
        }
    };
}
export const uploadNewAvatar = (file) => {
    return async (dispatch) => {
        dispatch(changeLoadingProcess(true));
        const response = await profileAPI.uploadNewAvatar(file)
        if (response.resultCode === 0) {
            dispatch(updateAvatar(response.data.photos));
            dispatch(changeLoadingProcess(false));
        }
    };
}

export default profileReducer;
