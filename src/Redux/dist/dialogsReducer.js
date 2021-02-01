"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.setNewMessageThunk = void 0;
var redux_form_1 = require("redux-form");
var SET_NEW_MESSAGE = "dialogsReducer/SET_NEW_MESSAGE";
var initialState = {
    dialogs: [
        {
            //Using random ID due to lack of dialog's API on back-end
            id: Math.floor(Math.random() * 10000000),
            message: "Hello friends"
        },
        {
            id: Math.floor(Math.random() * 10000000),
            message: "Nice to meet you, bro"
        },
    ]
};
var dialogsReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SET_NEW_MESSAGE:
            return __assign(__assign({}, state), { dialogs: __spreadArrays(state.dialogs, [action.payLoad]) });
        default:
            return state;
    }
};
var setNewMessage = function (newMessage) {
    return {
        type: SET_NEW_MESSAGE,
        //Using random ID due to lack of dialog's API on back-end
        payload: __assign({ id: Math.floor(Math.random() * 10000000) }, newMessage)
    };
};
// thunk
exports.setNewMessageThunk = function (newMessage) { return function (dispatch) {
    dispatch(setNewMessage(newMessage));
    //resetting form fields after dispatching new message (Redux Form method)
    dispatch(redux_form_1.reset("dialogForm"));
}; };
exports["default"] = dialogsReducer;
