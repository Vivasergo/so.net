import { followAPI, usersAPI } from "../api/api";

const FOLLOW_TRIGGER = "FOLLOW-TRIGGER";
const SET_USERS = "SET-USERS";
const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";


const initialState = {
  items: [],
  currentPage: 1,
  countItems: 10,
  totalPages: "",
  isLoading: null,
  followingProgress: [],
};

const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case FOLLOW_TRIGGER:
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.userId) {
            return {
              ...user,
              followed: !user.followed,
            };
          } else {
            return user;
          }
        }),
      };

    case SET_USERS:
      return {
        ...state,
        items: [...action.items],
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.totalPages,
      };

    case TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingProgress: action.isLoading
          ? [...state.followingProgress, action.userId]
          : state.followingProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

export const followTrigger = (userId) => {
  return {
    type: FOLLOW_TRIGGER,
    userId,
  };
};

export const setUsers = (items) => {
  return {
    type: SET_USERS,
    items,
  };
};

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};

export const setTotalPages = (totalPages) => {
  return {
    type: SET_TOTAL_PAGES,
    totalPages,
  };
};

export const toggleIsLoading = (isLoading) => {
  return {
    type: TOGGLE_IS_LOADING,
    isLoading,
  };
};

export const toggleFollowingProgress = (isLoading, userId) => {
  return {
    type: TOGGLE_FOLLOWING_PROGRESS,
    isLoading,
    userId,
  };
};

//thunk creator & thunk, accepting dispatch
export const getUsers = (countItems, page = 1) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));

    usersAPI.getUsers(countItems, page).then((data) => {
      dispatch(toggleIsLoading(false));
      dispatch(setUsers(data.items));
      dispatch(setCurrentPage(page));
      dispatch(setTotalPages(data.totalCount));
    });
  };
};

//thunk creator & thunk, accepting dispatch
export const unfollow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    followAPI.unfollow(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(followTrigger(userId));
        dispatch(toggleFollowingProgress(false, userId));
      }
    });
  };
};

//thunk creator & thunk, accepting dispatch
export const follow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    followAPI.follow(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(followTrigger(userId));
        dispatch(toggleFollowingProgress(false, userId));
      }
    });
  };
};

export default usersReducer;
