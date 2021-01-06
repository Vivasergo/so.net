import { createSelector } from "reselect";

//using reselect for optimization of performance and memoization of state objects
const getUsersItemsSel = (state)=>{
    return state.usersPage.items; 
}

export const getUsersItems = createSelector(getUsersItemsSel, (users)=>{
    return users.filter(u => true);
})

const isAuthSel = (state)=>{
    return state.auth.isLogged;
}

export const isAuth = createSelector(isAuthSel, (isLogged)=>{
    return isLogged;
})