import { createSelector } from "reselect";


const getUsersItemsSel = (state)=>{
    return state.usersPage.items; 
}

export const getUsersItems = createSelector(getUsersItemsSel, (users)=>{
    return users.filter(u => true);
})