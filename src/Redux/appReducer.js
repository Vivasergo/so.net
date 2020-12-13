import { getAuthUserData } from "./authReducer";

const INITIALIZE_SUCCESS = "INITIALIZE_SUCCESS";

let initialState = {
  initialized: false,
};

let appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

export const initializeSuccess = () => {
  return {
    type: INITIALIZE_SUCCESS,
  };
};

//thunk creator & thunk, accepting dispatch
export const initializeApp = () => (dispatch) => {
  const despResponse = dispatch(getAuthUserData());

  despResponse.then(() => dispatch(initializeSuccess()));
};

export default appReducer;