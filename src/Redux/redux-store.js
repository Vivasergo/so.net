import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";


let reducers = combineReducers({
 auth:authReducer,
  usersPage: usersReducer,
  userProfile: profileReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;

