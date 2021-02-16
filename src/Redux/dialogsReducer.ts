import { FormAction, reset } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";


const SET_NEW_MESSAGE = "dialogsReducer/SET_NEW_MESSAGE";

export type DialogType = {
	id: number;
	message: string;
};

export type DialogInitialStateType = {
	dialogs: Array<DialogType>;
};

let initialState: DialogInitialStateType = {
  dialogs: [
    {
      //Using random ID due to lack of dialogs API on back-end
      id: Math.floor(Math.random() * 10000000),
      message: "Hello friends",
    },
    {
      id: Math.floor(Math.random() * 10000000),
      message: "Nice to meet you, bro",
    },
  ],
};

let dialogsReducer = (
  state = initialState,
  action: any
): DialogInitialStateType => {
  switch (action.type) {
    case SET_NEW_MESSAGE:
      return { ...state, dialogs: [...state.dialogs, action.payload] };

    default:
      return state;
  }
};

type SetNewMessageType = {
  type: typeof SET_NEW_MESSAGE;
  payload: {id:number};
};

const setNewMessage = (newMessage:{message:string}):SetNewMessageType => {
	return {
		type: SET_NEW_MESSAGE,
		//Using random ID due to lack of dialogs API on back-end
		payload: { id: Math.floor(Math.random() * 10000000), ...newMessage },
	};
};

type ActionType = SetNewMessageType | FormAction

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;
// thunk
export const setNewMessageThunk = (newMessage: { message: string }): ThunkType => (dispatch) => {
  dispatch(setNewMessage(newMessage));

  //resetting form fields after dispatching new message (Redux Form method)
  dispatch(reset("dialogForm"));
};

export default dialogsReducer;
