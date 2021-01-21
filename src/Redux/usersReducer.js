import { followAPI, usersAPI } from "../api/api";
import { requestErrorHandler, serverResponseErrorHandler } from "./appReducer";

const FOLLOW_TRIGGER = "usersReducer/FOLLOW-TRIGGER";
const SET_USERS = "usersReducer/SET-USERS";
const SET_TOTAL_PAGES = "usersReducer/SET_TOTAL_PAGES";
const SET_CURRENT_PAGE = "usersReducer/SET_CURRENT_PAGE";
const TOGGLE_IS_LOADING = "usersReducer/TOGGLE_IS_LOADING";
const TOGGLE_FOLLOWING_PROGRESS = "usersReducer/TOGGLE_FOLLOWING_PROGRESS";

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
	return async (dispatch) => {
		dispatch(toggleIsLoading(true));
		try {
			const { data } = await usersAPI.getUsers(countItems, page);
			dispatch(toggleIsLoading(false));
			dispatch(setUsers(data.items));
			dispatch(setCurrentPage(page));
			dispatch(setTotalPages(data.totalCount));
		} catch (error) {
			dispatch(toggleIsLoading(false));
			dispatch(requestErrorHandler(error));
		}
	};
};

//thunk creator & thunk, accepting dispatch
export const unfollow = (userId) => {
	return async (dispatch) => {
		try {
			dispatch(toggleFollowingProgress(true, userId));

			const { data } = await followAPI.unfollow(userId);
			if (data.resultCode === 0) {
				dispatch(followTrigger(userId));
			} else {
				dispatch(serverResponseErrorHandler(data.messages[0]));
			}
			dispatch(toggleFollowingProgress(false, userId));
		} catch (error) {
			dispatch(toggleFollowingProgress(false, userId));
			dispatch(requestErrorHandler(error));
		}
	};
};

//thunk creator & thunk, accepting dispatch
export const follow = (userId) => {
	return async (dispatch) => {
		try {
			dispatch(toggleFollowingProgress(true, userId));

			const { data } = await followAPI.follow(userId);
			if (data.resultCode === 0) {
				dispatch(followTrigger(userId));
			} else {
				dispatch(serverResponseErrorHandler(data.messages[0]));
			}
			dispatch(toggleFollowingProgress(false, userId));
		} catch (error) {
			dispatch(toggleFollowingProgress(false, userId));
			dispatch(requestErrorHandler(error));
		}
	};
};

export default usersReducer;
