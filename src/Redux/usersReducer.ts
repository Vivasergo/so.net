import { UserType } from './../Types/types';
import { followAPI, usersAPI } from "../api/api";
import { requestErrorHandler, serverResponseErrorHandler } from "./appReducer";

const FOLLOW_TRIGGER = "usersReducer/FOLLOW-TRIGGER";
const SET_USERS = "usersReducer/SET-USERS";
const SET_TOTAL_PAGES = "usersReducer/SET_TOTAL_PAGES";
const SET_CURRENT_PAGE = "usersReducer/SET_CURRENT_PAGE";
const TOGGLE_IS_LOADING = "usersReducer/TOGGLE_IS_LOADING";
const TOGGLE_FOLLOWING_PROGRESS = "usersReducer/TOGGLE_FOLLOWING_PROGRESS";


const initialState = {
	items: [] as Array<UserType>,
	currentPage: 1,
	countItems: 10,
	totalPages: "",
	isLoading: null as boolean | null,
	followingProgress: [] as Array<number>,
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action:any): InitialStateType => {
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

type FollowTriggerType ={
	type: typeof FOLLOW_TRIGGER
	userId: number
}
export const followTrigger = (userId: number):FollowTriggerType => {
	return {
		type: FOLLOW_TRIGGER,
		userId,
	};
};

type SetUsersType ={
	type: typeof SET_USERS
	items: Array<UserType>
}
export const setUsers = (items:Array<UserType>):SetUsersType => {
	return {
		type: SET_USERS,
		items,
	};
};

type SetCurrentPageType ={
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}
export const setCurrentPage = (currentPage: number):SetCurrentPageType => {
	return {
		type: SET_CURRENT_PAGE,
		currentPage,
	};
};

type SetTotalPagesType ={
	type: typeof SET_TOTAL_PAGES
	totalPages: number
}
export const setTotalPages = (totalPages: number):SetTotalPagesType => {
	return {
		type: SET_TOTAL_PAGES,
		totalPages,
	};
};

type ToggleIsLoadingType ={
	type: typeof TOGGLE_IS_LOADING
	isLoading: boolean
}
export const toggleIsLoading = (isLoading:boolean):ToggleIsLoadingType => {
	return {
		type: TOGGLE_IS_LOADING,
		isLoading,
	};
};

type ToggleFollowingProgressType ={
	type: typeof TOGGLE_FOLLOWING_PROGRESS
	isLoading: boolean
	userId:number
}
export const toggleFollowingProgress = (isLoading:boolean, userId:number):ToggleFollowingProgressType => {
	return {
		type: TOGGLE_FOLLOWING_PROGRESS,
		isLoading,
		userId,
	};
};

//thunk creator & thunk, accepting dispatch
export const getUsers = (countItems:number, page = 1) => {
	return async (dispatch:any) => {
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
export const unfollow = (userId:number) => {
	return async (dispatch:any) => {
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
export const follow = (userId:number) => {
	return async (dispatch:any) => {
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
