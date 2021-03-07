import { InferringActionType, ThunkType } from './../Types/types'
import { FormAction, reset } from 'redux-form'

//const action types
const SET_NEW_MESSAGE = 'dialogsReducer/SET_NEW_MESSAGE'

//types
type DialogType = {
    id: number
    message: string
}
export type DialogInitialStateType = {
    dialogs: Array<DialogType>
}
type ActionType = ReturnType<InferringActionType<typeof actions>> | FormAction
type CurrentThunkType = ThunkType<ActionType, void>

//
let initialState: DialogInitialStateType = {
    dialogs: [
        {
            //Using random ID due to lack of dialogs API on back-end
            id: Math.floor(Math.random() * 10000000),
            message: 'Hello friends',
        },
        {
            id: Math.floor(Math.random() * 10000000),
            message: 'Nice to meet you, bro',
        },
    ],
}

let dialogsReducer = (
    state = initialState,
    action: ActionType
): DialogInitialStateType => {
    switch (action.type) {
        case SET_NEW_MESSAGE:
            return { ...state, dialogs: [...state.dialogs, action.payload] }

        default:
            return state
    }
}

//
const actions = {
    setNewMessage: (newMessage: { message: string }) => {
        return {
            type: SET_NEW_MESSAGE,
            //Using random ID due to lack of dialogs API on back-end
            payload: {
                id: Math.floor(Math.random() * 10000000),
                ...newMessage,
            },
        } as const
    },
}

// thunk
export const setNewMessageThunk = (newMessage: { message: string }): CurrentThunkType => (dispatch) => {
    dispatch(actions.setNewMessage(newMessage))

    //resetting form fields after dispatching new message (Redux Form method)
    dispatch(reset('dialogForm'))
}

export default dialogsReducer
