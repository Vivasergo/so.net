import { Pagination } from '@material-ui/lab'
import queryString from 'query-string'
import React, { ChangeEvent, FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {
    selectAuthUserId,
    selectCountItems,
    selectCurrentPage,
    selectFilter,
    selectIsLoading,
    selectTotalPages,
    selectUsersItems,
} from '../../../Redux/Selectors/usersPage-selectors'
import { getUsers } from '../../../Redux/usersReducer'
import Preloader from '../../common/Preloader/Preloader'
import { getUsersFilterQueryString } from '../../common/utils/helpFunc'
import useWindowSize from '../../common/utils/ShowWindowDimensions/useWindowSize'
import User from './User'
import s from './users.module.css'
import { UsersSearch } from './UsersSearch'

const Users: FC = (props) => {
    const dispatch = useDispatch()
    const authUserId = useSelector(selectAuthUserId)
    const users = useSelector(selectUsersItems)
    const countItems = useSelector(selectCountItems)
    const totalPages = useSelector(selectTotalPages)
    const isLoading = useSelector(selectIsLoading)
    const page = useSelector(selectCurrentPage)
    const filter = useSelector(selectFilter)

    const [windowWidth] = useWindowSize()
    const history = useHistory()

    useEffect(() => {
        const currentQuery = queryString.parse(history.location.search)

        let currentPage = Number(currentQuery.page)
        if (!currentPage) {
            currentPage = 1
        }
        if (!currentQuery.term) {
            currentQuery.term = ''
        }

        let friendFilter =
            currentQuery.friend === 'null' || currentQuery.friend === undefined
                ? null
                : currentQuery.friend === 'true'
                ? true
                : false

        dispatch(
            getUsers(countItems, currentPage, {
                term: String(currentQuery.term),
                friend: friendFilter,
            })
        )
    }, [])

    useEffect(() => {
        let searchQuery = `?count=${countItems}&page=${page}`
        if (filter.term !== '' || filter.friend !== null) {
            searchQuery += '&' + getUsersFilterQueryString(filter)
        }
        history.push(searchQuery)
    }, [filter, page, countItems])

    const totalSheets = Math.ceil(totalPages / countItems)

    const handlePageLinkClick = (_: ChangeEvent<unknown>, page: number) => {
        dispatch(getUsers(countItems, page, filter))
    }

    return (
        <>
            {isLoading && <Preloader />}

            <section className='items-container'>
                <h3>Users</h3>
                <div>
                    <UsersSearch />
                </div>
                <div className={s.paginationBlock}>
                    <Pagination
                        onChange={handlePageLinkClick}
                        page={page}
                        count={totalSheets}
                        //changing the number of sibling pages depending on the window's width
                        siblingCount={windowWidth <= 930 ? 0 : 2}
                        color={'primary'}
                        variant='outlined'
                        shape={'rounded'}
                    />
                </div>
                {users.map((user) => {
                    //Don't show authorized user's profile block among the other users profiles
                    return authUserId === user.id ? '' : <User key={user.id} user={user} />
                })}

                <div className={s.paginationBlock}>
                    <Pagination
                        onChange={handlePageLinkClick}
                        page={page}
                        count={totalSheets}
                        siblingCount={windowWidth <= 930 ? 0 : 2}
                        color={'primary'}
                        variant='outlined'
                        shape={'rounded'}
                    />
                </div>
            </section>
        </>
    )
}

export default Users
