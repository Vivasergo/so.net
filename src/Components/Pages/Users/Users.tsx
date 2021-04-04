import { Pagination } from '@material-ui/lab'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAuthUserId,
  getCountItems,
  getIsLoading,
  getTotalPages,
  getUsersItems
} from '../../../Redux/Selectors/usersPage-selectors'
import { getUsers } from '../../../Redux/usersReducer'
import Preloader from '../../common/Preloader/Preloader'
import useWindowSize from '../../common/utils/ShowWindowDimensions/useWindowSize'
import User from './User'
import s from './users.module.css'

const Users: FC = (props) => {
    const dispatch = useDispatch()
    const authUserId = useSelector(getAuthUserId)
    const users = useSelector(getUsersItems)
    const countItems = useSelector(getCountItems)
    const totalPages = useSelector(getTotalPages)
    const isLoading = useSelector(getIsLoading)

    const [page, setPage] = useState(1)

    //custom Hook to control window width change
    const [windowWidth] = useWindowSize()

    useEffect(() => {
        dispatch(getUsers(countItems))

    }, [])

    const totalSheets = Math.ceil(totalPages / countItems)

    const handlePageLinkClick = (_: ChangeEvent<unknown>, page: number) => {
        dispatch(getUsers(countItems, page))
        setPage(page)
    }

    return (
        <>
            {isLoading && <Preloader />}

            <section className='items-container'>
                <h3>Users</h3>

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
