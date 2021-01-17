import {reset} from 'redux-form';

const SET_NEW_MESSAGE = "dialogsReducer/SET_NEW_MESSAGE";

let initialState = {
    dialogs: [
        {
            //Using random ID due to lack of dialog's API on back-end
            id: Math.floor(Math.random()*10000000),
            message: "Hello friends",
        },
        {
            id: Math.floor(Math.random()*10000000),
            message: "Nice to meet you, bro",
        },
    ],
};


let dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_NEW_MESSAGE:
            return {...state, dialogs: [...state.dialogs, action.payLoad]};

        default:
            return state;
    }
};

const setNewMessage = (newMessage) => {
    return {
        type: SET_NEW_MESSAGE,
        //Using random ID due to lack of dialog's API on back-end
        payLoad: {id: Math.floor(Math.random()*10000000), ...newMessage}
    };
};

// thunk
export const setNewMessageThunk = (newMessage) => (dispatch) => {
    dispatch(setNewMessage(newMessage));

    //resetting form fields after dispatching new message (Redux Form method)
    dispatch(reset('dialogForm'));

};

export default dialogsReducer;
