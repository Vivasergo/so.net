import { AppStateType } from './redux-store';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppErrorType } from './../Types/types';
import { getAuthUserData } from "./authReducer";

//action type
const INITIALIZE_SUCCESS = "appReducer/INITIALIZE_SUCCESS";
const ERROR_HANDLER = "appReducer/ERROR_HANDLER";


let initialState = {
	initialized: false,
	appError: null as AppErrorType | null,
};

type InitialStateType = typeof initialState;

type ActionType = InitializeSuccessActionType | ErrorHandlerActionType;

let appReducer = (state = initialState, action: ActionType): InitialStateType => {
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

type InitializeSuccessActionType = {
	type: typeof INITIALIZE_SUCCESS;
};

//action creator
export const initializeSuccess = (): InitializeSuccessActionType => {
	return {
		type: INITIALIZE_SUCCESS,
	};
};

export type ErrorHandlerActionType = {
	type: typeof ERROR_HANDLER;
	payload: AppErrorType | null
};

export const requestErrorHandler = (payload: AppErrorType | null):ErrorHandlerActionType => {
	return {
		type: ERROR_HANDLER,
		payload,
	};
};

export const serverResponseErrorHandler = (message: string): ErrorHandlerActionType => {
	return {
		type: ERROR_HANDLER,
		payload: { response: { status: "Server response" }, message },
	};
};

type DispatchType = Dispatch<ActionType>;
type ThunkType = ThunkAction<Promise<void>, AppStateType,unknown, ActionType>

//thunk creator & thunk, accepting dispatch
export const initializeApp = (): ThunkType => async (dispatch) => {
  //dispatching auth check and returning promise
  await dispatch(getAuthUserData());

  //waiting  for auth check and dispatching initialization:true despite the auth check results
  dispatch(initializeSuccess());
};

export const errorGenerate = () => (dispatch: DispatchType) => {
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
