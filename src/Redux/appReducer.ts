import { getAuthUserData } from "./authReducer";

//action type
const INITIALIZE_SUCCESS = "appReducer/INITIALIZE_SUCCESS";
const ERROR_HANDLER = "appReducer/ERROR_HANDLER";

type appErrorType = {
	response: { status: string };
	message: string;
};

let initialState = {
	initialized: false,
	appError: null as appErrorType | null,
};

type initialStateType = typeof initialState;

let appReducer = (state = initialState, action: any): initialStateType => {
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

type initializeSuccessActionType = {
	type: typeof INITIALIZE_SUCCESS;
};

//action creator
export const initializeSuccess = (): initializeSuccessActionType => {
	return {
		type: INITIALIZE_SUCCESS,
	};
};

type errorHandlerActionType = {
	type: typeof ERROR_HANDLER;
	payload: appErrorType | null
};

export const requestErrorHandler = (payload: appErrorType | null):errorHandlerActionType => {
	return {
		type: ERROR_HANDLER,
		payload,
	};
};

export const serverResponseErrorHandler = (message: string): errorHandlerActionType => {
	return {
		type: ERROR_HANDLER,
		payload: { response: { status: "Server response" }, message },
	};
};



//thunk creator & thunk, accepting dispatch
export const initializeApp = () => async (dispatch: any) => {
	//dispatching auth check and returning promise
	await dispatch(getAuthUserData());

	//waiting  for auth check and dispatching initialization:true despite the auth check results
	dispatch(initializeSuccess());
};

export const errorGenerate = () => (dispatch: any) => {
	dispatch(
		requestErrorHandler({
			response: { status: "Artificial" },
			message:
				"This error has been generated manually to simulate error while server request and shows app behavior",
		})
	);
};
export const errorReset = () => (dispatch: any) => {
	dispatch(requestErrorHandler(null));
};

export default appReducer;
