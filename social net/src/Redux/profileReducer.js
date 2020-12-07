import { profileAPI } from "../api/api";

const SET_USER_PROFILE = "SET_USER_PROFILE";

let initialState = {
  profile: null,
};

let profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
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


//thunk
export const getProfile = (userId) =>{
  return (dispatch) => {
    profileAPI.getProfile(userId).then((profileData) => {
      dispatch(setUserProfile(profileData));
    });
  }
}

export default profileReducer;
