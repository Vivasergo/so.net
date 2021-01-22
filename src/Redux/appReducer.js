import { getAuthUserData } from "./authReducer";

//action type
const INITIALIZE_SUCCESS = "appReducer/INITIALIZE_SUCCESS";
const ERROR_HANDLER = "appReducer/ERROR_HANDLER";

let initialState = {
	initialized: false,
	appError: null,
};

let appReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIALIZE_SUCCESS:
			return {
				...state,
				initialized: true,
			};
		case ERROR_HANDLER:
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

export const requestErrorHandler = (payload) => {
	return {
		type: ERROR_HANDLER,
		payload,
	};
};
export const serverResponseErrorHandler = (message) => {
	return {
		type: ERROR_HANDLER,
		payload: { response: { status: "Server response" }, message },
	};
};

//thunk creator & thunk, accepting dispatch
export const initializeApp = () => async (dispatch) => {
	//dispatching auth check and returning promise
	await dispatch(getAuthUserData());

	//waiting  for auth check and dispatching initialization:true despite the auth check results
	dispatch(initializeSuccess());
};

export const errorGenerate = () => (dispatch) => {
	dispatch(
		requestErrorHandler({
			response: { status: "Artificial" },
			message: "This error has been generated manually to simulate error while server request and shows app behavior",
		})
	);
};
export const errorReset = () => (dispatch) => {
	dispatch(requestErrorHandler(null));
};

export default appReducer;
