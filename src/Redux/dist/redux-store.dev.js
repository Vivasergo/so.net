"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _authReducer = _interopRequireDefault(require("./authReducer"));

var _profileReducer = _interopRequireDefault(require("./profileReducer"));

var _usersReducer = _interopRequireDefault(require("./usersReducer"));

var _dialogsReducer = _interopRequireDefault(require("./dialogsReducer"));

var _reduxForm = require("redux-form");

var _appReducer = _interopRequireDefault(require("./appReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reducers = (0, _redux.combineReducers)({
  auth: _authReducer["default"],
  usersPage: _usersReducer["default"],
  userProfile: _profileReducer["default"],
  userDialogs: _dialogsReducer["default"],
  app: _appReducer["default"],
  form: _reduxForm.reducer
}); // let store = createStore(reducers, applyMiddleware(thunk));
//special functionality to apply browser extension Redux DevTools

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
var store = (0, _redux.createStore)(reducers,
/* preloadedState, */
composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk["default"])));
window.store = store;
var _default = store;
exports["default"] = _default;