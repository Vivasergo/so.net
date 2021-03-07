import { InferringActionType, ThunkType, UserType } from './../Types/types'
import { followAPI, usersAPI } from '../api/api'
import { ErrorHandlerActionType, requestErrorHandler, serverResponseErrorHandler } from './appReducer'

//const action types
const FOLLOW_TRIGGER = 'usersReducer/FOLLOW-TRIGGER'
const SET_USERS = 'usersReducer/SET-USERS'
const SET_TOTAL_PAGES = 'usersReducer/SET_TOTAL_PAGES'
const SET_CURRENT_PAGE = 'usersReducer/SET_CURRENT_PAGE'
const TOGGLE_IS_LOADING = 'usersReducer/TOGGLE_IS_LOADING'
const TOGGLE_FOLLOWING_PROGRESS = 'usersReducer/TOGGLE_FOLLOWING_PROGRESS'

//types
type InitialStateType = typeof initialState
type ActionType = ReturnType<InferringActionType<typeof actions>> | ErrorHandlerActionType
type CurrentThunkType = ThunkType<ActionType >

const initialState = {
    items: [] as Array<UserType>,
    currentPage: 1,
    countItems: 10,
    totalPages: 0,
    isLoading: null as boolean | null,
    followingProgress: [] as Array<number>,
}

const usersReducer = (
    state = initialState,
    action: ActionType
): InitialStateType => {
    switch (action.type) {
        case FOLLOW_TRIGGER:
            return {
                ...state,
                items: state.items.map((user) => {
                    if (user.id === action.userId) {
                        return {
                            ...user,
                            followed: !user.followed,
                        }
                    } else {
                        return user
                    }
                }),
            }
        case SET_USERS:
            return {
                ...state,
                items: [...action.items],
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.totalPages,
            }
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            }
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingProgress: action.isLoading
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(
                          (id) => id !== action.userId
                      ),
            }
        default:
            return state
    }
}

//
const actions = {
    followTrigger: (userId: number) => {
        return {
            type: FOLLOW_TRIGGER,
            userId,
        } as const
    },
    setUsers: (items: Array<UserType>) => {
        return {
            type: SET_USERS,
            items,
        } as const
    },
    setCurrentPage: (currentPage: number) => {
        return {
            type: SET_CURRENT_PAGE,
            currentPage,
        } as const
    },
    setTotalPages: (totalPages: number) => {
        return {
            type: SET_TOTAL_PAGES,
            totalPages,
        } as const
    },
    toggleIsLoading: (isLoading: boolean) => {
        return {
            type: TOGGLE_IS_LOADING,
            isLoading,
        } as const
    },
    toggleFollowingProgress: (isLoading: boolean, userId: number) => {
        return {
            type: TOGGLE_FOLLOWING_PROGRESS,
            isLoading,
            userId,
        } as const
    },
}

export const { setCurrentPage } = actions

//thunk creator & thunk, accepting dispatch
export const getUsers = (countItems: number, page = 1): CurrentThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsLoading(true))
        try {
            const { data } = await usersAPI.getUsers(countItems, page)
            dispatch(actions.toggleIsLoading(false))
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setCurrentPage(page))
            dispatch(actions.setTotalPages(data.totalCount))
        } catch (error) {
            dispatch(actions.toggleIsLoading(false))
            dispatch(requestErrorHandler(error))
        }
    }
}

//thunk creator & thunk, accepting dispatch
export const unfollow = (userId: number): CurrentThunkType => {
    return async (dispatch) => {
        try {
            dispatch(actions.toggleFollowingProgress(true, userId))

            const { data } = await followAPI.unfollow(userId)
            if (data.resultCode === 0) {
                dispatch(actions.followTrigger(userId))
            } else {
                dispatch(serverResponseErrorHandler(data.messages[0]))
            }
            dispatch(actions.toggleFollowingProgress(false, userId))
        } catch (error) {
            dispatch(actions.toggleFollowingProgress(false, userId))
            dispatch(requestErrorHandler(error))
        }
    }
}

//thunk creator & thunk, accepting dispatch
export const follow = (userId: number): CurrentThunkType => {
    return async (dispatch) => {
        try {
            dispatch(actions.toggleFollowingProgress(true, userId))

            const { data } = await followAPI.follow(userId)
            if (data.resultCode === 0) {
                dispatch(actions.followTrigger(userId))
            } else {
                dispatch(serverResponseErrorHandler(data.messages[0]))
            }
            dispatch(actions.toggleFollowingProgress(false, userId))
        } catch (error) {
            dispatch(actions.toggleFollowingProgress(false, userId))
            dispatch(requestErrorHandler(error))
        }
    }
}

export default usersReducer
