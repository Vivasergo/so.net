import { ProfileType, PhotosType } from './../Types/types';
import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { requestErrorHandler, serverResponseErrorHandler } from "./appReducer";

const SET_USER_PROFILE = "profileReducer/SET_USER_PROFILE";
const SET_USER_STATUS = "profileReducer/SET_USER_STATUS";
const UPLOAD_AVATAR_SUCCESS = "profileReducer/UPLOAD_AVATAR_SUCCESS";
const PROFILE_UPDATE_SUCCESS = "profileReducer/PROFILE_UPDATE_SUCCESS";
const PROFILE_UPDATE_RESET = "profileReducer/PROFILE_UPDATE_RESET";
const CHANGE_DATA_LOADING = "profileReducer/CHANGE_DATA_LOADING";

let initialState = {
	profile: null as ProfileType | null,
	status: "",
	isProfileUpdated: false,
	isProfileDataLoading: false,
};

type InitialStateType = typeof initialState

let profileReducer = (state = initialState, action:any):InitialStateType => {
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
				profile: { ...state.profile, photos: { ...action.photos } as PhotosType } as ProfileType,
			};
		case PROFILE_UPDATE_SUCCESS:
			return {
				...state,
				isProfileUpdated: true,
			};
		case PROFILE_UPDATE_RESET:
			return {
				...state,
				isProfileUpdated: false,
			};
		case CHANGE_DATA_LOADING:
			return {
				...state,
				isProfileDataLoading: action.payload,
			};

		default:
			return state;
	}
};
type SetUserProfileType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}
export const setUserProfile = (profile:ProfileType):SetUserProfileType => {
	return {
		type: SET_USER_PROFILE,
		profile,
	};
};

type SetUserStatusType = {
	type: typeof SET_USER_STATUS
	status: string
}
export const setUserStatus = (status:string):SetUserStatusType => {
	return {
		type: SET_USER_STATUS,
		status,
	};
};

type UpdateAvatarType = {
	type: typeof UPLOAD_AVATAR_SUCCESS
	photos:PhotosType
}
export const updateAvatar = (photos:PhotosType):UpdateAvatarType => {
	return {
		type: UPLOAD_AVATAR_SUCCESS,
		photos,
	};
};

type SetUpdateProfileSuccessType = {
	type: typeof PROFILE_UPDATE_SUCCESS
}
export const setUpdateProfileSuccess = ():SetUpdateProfileSuccessType => {
	return {
		type: PROFILE_UPDATE_SUCCESS,
	};
};

type ResetUpdateProfileType = {
	type: typeof PROFILE_UPDATE_RESET
}
export const resetUpdateProfile = ():ResetUpdateProfileType => {
	return {
		type: PROFILE_UPDATE_RESET,
	};
};

type ChangeLoadingProcessType = {
	type: typeof CHANGE_DATA_LOADING
	payload:boolean
}
export const changeLoadingProcess = (payload:boolean):ChangeLoadingProcessType => {
	return {
		type: CHANGE_DATA_LOADING,
		payload,
	};
};

//thunk
export const getProfile = (userId:number) => {
	return async (dispatch:any) => {
		try {
			const { data } = await profileAPI.getProfile(userId);
			dispatch(setUserProfile(data));
		} catch (error) {
			dispatch(requestErrorHandler(error));
		}
	};
};

export const getStatus = (userId:number) => {
	return async (dispatch:any) => {
		try {
			const { data } = await profileAPI.getStatus(userId);
			dispatch(setUserStatus(data));
		} catch (error) {
			dispatch(requestErrorHandler(error));
		}
	};
};
export const updateStatus = (status:string) => {
	return async (dispatch:any) => {
		try {
			const response = await profileAPI.updateStatus(status);
			if (response.data.resultCode === 0) {
				dispatch(setUserStatus(status));
			} else {
				dispatch(serverResponseErrorHandler(response.data.messages[0]));
			}
		} catch (error) {
			dispatch(requestErrorHandler(error));
		}
	};
};
export const updateProfile = (formData:ProfileType) => {
	return async (dispatch:any) => {
		dispatch(changeLoadingProcess(true));
		try {
			const response = await profileAPI.updateProfile(formData);
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
				dispatch(stopSubmit("profile-edit-form", { _error: message }));
			}
		} catch (error) {
			dispatch(changeLoadingProcess(false));
			dispatch(requestErrorHandler(error));
		}
	};
};
export const uploadNewAvatar = (file:any) => {
	return async (dispatch:any) => {
		dispatch(changeLoadingProcess(true));
		try {
			const { data } = await profileAPI.uploadNewAvatar(file);
			if (data.resultCode === 0) {
				dispatch(updateAvatar(data.data.photos));
			} else {
				dispatch(serverResponseErrorHandler(data.messages[0]));
            }
            dispatch(changeLoadingProcess(false));
		} catch (error) {
			dispatch(changeLoadingProcess(false));
			dispatch(requestErrorHandler(error));
		}
	};
};

export default profileReducer;
