import { createSelector } from 'reselect'
import { AppStateType } from '../redux-store'

//selectors
const getUsersItemsSel = (state: AppStateType) => state.usersPage.items
const isAuthSel = (state: AppStateType) => state.auth.isLogged
export const getAuthUserId = (state: AppStateType) => state.auth.id
export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage
export const getCountItems = (state: AppStateType) => state.usersPage.countItems
export const getTotalPages = (state: AppStateType) => state.usersPage.totalPages
export const getIsLoading = (state: AppStateType) => state.usersPage.isLoading
export const getFollowingProgress = (state: AppStateType) => state.usersPage.followingProgress

//using reselect for optimization of performance and memoization of state objects
export const getUsersItems = createSelector(getUsersItemsSel, (users) => {
    return users.filter((u) => true)
})

export const getIsAuth = createSelector(isAuthSel, (isLogged) => {
    return isLogged
})
