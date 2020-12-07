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
  return (dispatch) => {
    profileAPI.getProfile(userId).then((profileData) => {
      dispatch(setUserProfile(profileData));
    });
  }
}

export const getStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then((status) => {
      dispatch(setUserStatus(status));
    });
  };
}
export const updateStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
      }
      
    });
  };
}

export default profileReducer;
