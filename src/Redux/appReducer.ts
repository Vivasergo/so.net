import { AppStateType } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { AppErrorType, InferringActionType } from "./../Types/types";
import { getAuthUserData } from "./authReducer";

//const action types
const INITIALIZE_SUCCESS = "appReducer/INITIALIZE_SUCCESS";
const ERROR_HANDLER = "appReducer/ERROR_HANDLER";

//types
type InitialStateType = typeof initialState;
type ActionType = ReturnType<InferringActionType<typeof actions>>;
export type ErrorHandlerActionType = {
    type: typeof ERROR_HANDLER;
    payload: AppErrorType | null;
};
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;

//
let initialState = {
    initialized: false,
    appError: null as AppErrorType | null,
};

//
let appReducer = (
    state = initialState,
    action: ActionType
): InitialStateType => {
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

//object of action creator
const actions = {
    initializeSuccess: () => {
        return {
            type: INITIALIZE_SUCCESS,
        } as const;
    },
    requestErrorHandler: (payload: AppErrorType | null) => {
        return {
            type: ERROR_HANDLER,
            payload,
        } as const;
    },
    serverResponseErrorHandler: (message: string) => {
        return {
            type: ERROR_HANDLER,
            payload: { response: { status: "Server response" }, message },
        } as const;
    },
};

export const { requestErrorHandler, serverResponseErrorHandler } = actions


//thunk creator & thunk, accepting dispatch
export const initializeApp = (): ThunkType => async (dispatch) => {
    //dispatching auth check and returning promise
    await dispatch(getAuthUserData());

    //waiting  for auth check and dispatching initialization:true despite the auth check results
    dispatch(actions.initializeSuccess());
};

export const errorGenerate = (): ThunkType => (dispatch) => {
    dispatch(
        actions.requestErrorHandler({
            response: { status: "Artificial" },
            message:
                "This error has been generated manually to simulate error while server request and shows app behavior",
        })
    );
};

export const errorReset = (): ThunkType => (dispatch) => {
    dispatch(actions.requestErrorHandler(null));
};

export default appReducer;
