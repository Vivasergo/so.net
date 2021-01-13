"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.uploadNewAvatar = exports.updateProfile = exports.updateStatus = exports.getStatus = exports.getProfile = exports.updateAvatar = exports.setUserStatus = exports.setUserProfile = void 0;

var _api = require("../api/api");

var _reduxForm = require("redux-form");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SET_USER_PROFILE = "profileReducer/SET_USER_PROFILE";
var SET_USER_STATUS = "profileReducer/SET_USER_STATUS";
var UPLOAD_AVATAR_SUCCESS = "profileReducer/UPLOAD_AVATAR_SUCCESS";
var UPDATE_PROFILE = "profileReducer/UPDATE_PROFILE";
var initialState = {
  profile: null,
  status: ""
};

var profileReducer = function profileReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_USER_PROFILE:
      return _objectSpread({}, state, {
        profile: action.profile
      });

    case SET_USER_STATUS:
      return _objectSpread({}, state, {
        status: action.status
      });

    case UPLOAD_AVATAR_SUCCESS:
      return _objectSpread({}, state, {
        profile: _objectSpread({}, state.profile, {
          photos: _objectSpread({}, action.photos)
        })
      });

    default:
      return state;
  }
};

var setUserProfile = function setUserProfile(profile) {
  return {
    type: SET_USER_PROFILE,
    profile: profile
  };
};

exports.setUserProfile = setUserProfile;

var setUserStatus = function setUserStatus(status) {
  return {
    type: SET_USER_STATUS,
    status: status
  };
};

exports.setUserStatus = setUserStatus;

var updateAvatar = function updateAvatar(photos) {
  return {
    type: UPLOAD_AVATAR_SUCCESS,
    photos: photos
  };
}; //thunk


exports.updateAvatar = updateAvatar;

var getProfile = function getProfile(userId) {
  return function _callee(dispatch) {
    var profileData;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_api.profileAPI.getProfile(userId));

          case 2:
            profileData = _context.sent;
            dispatch(setUserProfile(profileData));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.getProfile = getProfile;

var getStatus = function getStatus(userId) {
  return function _callee2(dispatch) {
    var status;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(_api.profileAPI.getStatus(userId));

          case 2:
            status = _context2.sent;
            dispatch(setUserStatus(status));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.getStatus = getStatus;

var updateStatus = function updateStatus(status) {
  return function _callee3(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_api.profileAPI.updateStatus(status));

          case 2:
            response = _context3.sent;

            if (response.data.resultCode === 0) {
              dispatch(setUserStatus(status));
            }

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.updateStatus = updateStatus;

var updateProfile = function updateProfile(formData) {
  return function _callee4(dispatch) {
    var response, message;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_api.profileAPI.updateProfile(formData));

          case 2:
            response = _context4.sent;

            if (response.data.resultCode === 0) {
              dispatch(getProfile(formData.userId));
            } else {
              //error processing: returning either message from server response if it is or
              //"common error" and any case interrupting form submitting via stopSubmit Redux Form method dispatching
              message = response.data.messages.length > 0 ? response.data.messages[0] : "Common error";
              dispatch((0, _reduxForm.stopSubmit)("profile-edit-form", {
                _error: message
              }));
            }

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.updateProfile = updateProfile;

var uploadNewAvatar = function uploadNewAvatar(file) {
  return function _callee5(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(_api.profileAPI.uploadNewAvatar(file));

          case 2:
            response = _context5.sent;

            if (response.resultCode === 0) {
              dispatch(updateAvatar(response.data.photos));
            }

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    });
  };
};

exports.uploadNewAvatar = uploadNewAvatar;
var _default = profileReducer;
exports["default"] = _default;