import { profileAPI } from "../api/api";

const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const UPLOAD_AVATAR_SUCCESS = "UPLOAD_AVATAR_SUCCESS";

let initialState = {
  profile: null,
  status: ""
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
        profile: {...state.profile}, photos: {...action.photos},
      };

    default:
      return state;
  }
};

export const setUserProfile = (profile) => {
    return({
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


//thunk
export const getProfile = (userId) =>{

  return async (dispatch) => {
    const profileData = await profileAPI.getProfile(userId);
      dispatch(setUserProfile(profileData));
  }
}

export const getStatus = (userId) => {
  return async (dispatch) => {
    const status = await profileAPI.getStatus(userId)
      dispatch(setUserStatus(status));
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
export const uploadNewAvatar = (file) => {
  return async (dispatch) => {
   const response = await profileAPI.uploadNewAvatar(file)
      if (response.resultCode === 0) {
        dispatch(updateAvatar(response.data.photos));
      }
  };
}

export default profileReducer;
