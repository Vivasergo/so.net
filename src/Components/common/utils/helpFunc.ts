import { usersSearchFilterType } from './../../../Types/types'

export const getUsersFilterQueryString = (filterObject?: usersSearchFilterType) => {
    let filterQuery = ``
    if (!!filterObject && filterObject.term !== '') {
        filterQuery += `term=${filterObject.term}${filterObject.friend != null?'&':''}`
    }
    if (!!filterObject && filterObject.friend != null) {
        filterQuery += `friend=${filterObject.friend}`
    }
    return filterQuery
}
