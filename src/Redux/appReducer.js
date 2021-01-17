import {getAuthUserData} from "./authReducer";

//action type
const INITIALIZE_SUCCESS = "appReducer/INITIALIZE_SUCCESS";
const ERROR_OCCURRED = "appReducer/ERROR_OCCURRED";

let initialState = {
    initialized: false,
    appError: null
};

let appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true,
            };
        case ERROR_OCCURRED:
            return {
                ...state,
                appError: action.payload,
            };

        default:
            return state;
    }
};

//action creator
export const initializeSuccess = () => {
    return {
        type: INITIALIZE_SUCCESS,
    };
};

export const errorOccurred = (payload) => {
    return {
        type: ERROR_OCCURRED,
        payload
    };
};

//thunk creator & thunk, accepting dispatch
export const initializeApp = () => async (dispatch) => {

    //?dispatching auth check and returning promise
    await dispatch(getAuthUserData());

    //?waiting for auth check and dispatching initialization:true despite the auth check results
    dispatch(initializeSuccess());
};

export const errorGenerate = () => (dispatch) => {
    dispatch(errorOccurred("Manually generated error!"))
}

export default appReducer;
