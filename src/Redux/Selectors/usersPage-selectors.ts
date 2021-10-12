import { createSelector } from 'reselect'
import { AppStateType } from '../redux-store'

//selectors
const getUsersItemsSel = (state: AppStateType) => state.usersPage.items
const isAuthSel = (state: AppStateType) => state.auth.isLogged
export const selectAuthUserId = (state: AppStateType) => state.auth.id
export const selectCurrentPage = (state: AppStateType) => state.usersPage.currentPage
export const selectCountItems = (state: AppStateType) => state.usersPage.countItems
export const selectFilter = (state: AppStateType) => state.usersPage.filter
export const selectTotalPages = (state: AppStateType) => state.usersPage.totalPages
export const selectIsLoading = (state: AppStateType) => state.usersPage.isLoading
export const selectFollowingProgress = (state: AppStateType) => state.usersPage.followingProgress

//using reselect for performance optimization and memoization of state objects
export const selectUsersItems = createSelector(getUsersItemsSel, (users) => {
    return users.filter((u) => true)
})

export const selectIsAuth = createSelector(isAuthSel, (isLogged) => {
    return isLogged
})
