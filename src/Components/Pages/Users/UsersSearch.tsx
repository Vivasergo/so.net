import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { selectCountItems, selectFilter } from '../../../Redux/Selectors/usersPage-selectors'
import { getUsers } from '../../../Redux/usersReducer'
import { friendQueryType } from '../../../Types/types'
import { convertQueryStringFriendValue } from '../../common/utils/helpFunc'
import s from './users.module.css'

const usersSearchValidationSchema = Yup.object().shape({
    term: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!'),
})

type MyFormValues = {
    term: string
    friend: friendQueryType
}

export const UsersSearch: FC = React.memo(() => {
    const dispatch = useDispatch()
    let searchFilterFromState = useSelector(selectFilter)
    const countItems = useSelector(selectCountItems)

    const initialValues: MyFormValues = {
        term: searchFilterFromState.term,
        friend: String(searchFilterFromState.friend) as friendQueryType,
    }

    const handleSubmit = (value: MyFormValues) => {
        const convertedFriendValue = convertQueryStringFriendValue(value.friend)
        const convertedFilterValue = { term: value.term, friend: convertedFriendValue }
        dispatch(getUsers(countItems, 1, convertedFilterValue))
    }

    return (
        <div className='text-center'>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={usersSearchValidationSchema}
                onSubmit={handleSubmit}>
                {() => (
                    <Form>
                        <label htmlFor='term' className='form-label me-1'>
                            Users search:
                        </label>
                        <Field id='term' name='term' className={s.searchField} />
                        <label htmlFor='friend' className='form-label me-1'>
                            Choose one:
                        </label>
                        <Field as='select' name='friend' id='friend' className={s.searchField}>
                            <option value='null'>All users</option>
                            <option value='true'>Only followed</option>
                            <option value='false'>Only unfollowed</option>
                        </Field>
                        <button className={`btn btn-info btn-sm ${s.searchButton}`} type='submit'>
                            Search
                        </button>
                        <div className='text-danger fw-bold ms-2'>
                            <ErrorMessage name='term' />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
