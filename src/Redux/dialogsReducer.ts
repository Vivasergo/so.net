import { reset } from "redux-form";

type DialogType = {
	id: number;
	message: string;
};

type InitialStateType = {
	dialogs: Array<DialogType>;
};

type SetNewMessageType = {
	type: typeof SET_NEW_MESSAGE;
	payload: any
};

const SET_NEW_MESSAGE = "dialogsReducer/SET_NEW_MESSAGE";

let initialState: InitialStateType = {
	dialogs: [
		{
			//Using random ID due to lack of dialog's API on back-end
			id: Math.floor(Math.random() * 10000000),
			message: "Hello friends",
		},
		{
			id: Math.floor(Math.random() * 10000000),
			message: "Nice to meet you, bro",
		},
	],
};

let dialogsReducer = (state = initialState, action: any):InitialStateType => {
	switch (action.type) {
		case SET_NEW_MESSAGE:
			return { ...state, dialogs: [...state.dialogs, action.payload] };

		default:
			return state;
	}
};

const setNewMessage = (newMessage:{message:string}):SetNewMessageType => {
	return {
		type: SET_NEW_MESSAGE,
		//Using random ID due to lack of dialog's API on back-end
		payload: { id: Math.floor(Math.random() * 10000000), ...newMessage },
	};
};

// thunk
export const setNewMessageThunk = (newMessage:any) => (dispatch:any) => {
	dispatch(setNewMessage(newMessage));

	//resetting form fields after dispatching new message (Redux Form method)
	dispatch(reset("dialogForm"));
};

export default dialogsReducer;
