import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";


let reducers = combineReducers({
  auth:authReducer,
  categories: categoryReducer,
  usersPage: usersReducer,
  userProfile: profileReducer,
  
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;
