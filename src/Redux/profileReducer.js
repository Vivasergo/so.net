import { profileAPI } from "../api/api";

const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";

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

export default profileReducer;
