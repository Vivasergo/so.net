import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import { reducer as formReducer } from "redux-form";


let reducers = combineReducers({
 auth:authReducer,
  usersPage: usersReducer,
  userProfile: profileReducer,
  form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;

