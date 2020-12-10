const SET_NEW_MESSAGE = "SET_NEW_MESSAGE";

let initialState = {
  dialogs: [
    {
      id: 1,
      message: "Hello friends",
    },
    {
      id: 2,
      message: "Nice to meet you, bro",
    },
  ],
};

let dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_MESSAGE:
      return { ...state, dialogs: [...state.dialogs, action.payLoad] };

    default:
      return state;
  }
};

const setNewMessage = (newMessage) => {
  return {
    type: SET_NEW_MESSAGE,
    payLoad: {id:3, ...newMessage}
  };
};

// //?thunk
export const setNewMessageThunk = (newMessage) => (dispatch) => {
  return dispatch(setNewMessage(newMessage));
};

export default dialogsReducer;
