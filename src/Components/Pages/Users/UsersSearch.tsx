import React, { FC } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import s from './users.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCountItems } from '../../../Redux/Selectors/usersPage-selectors'
import { getUsers } from '../../../Redux/usersReducer'

const usersSearchValidationSchema = Yup.object().shape({
    term: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!'),
})

// type Props = {
//     countItems: number
//     getUsers: (countItems: number, page?:number, term?:string, friend?:string) => void
// }
type MyFormValues = {
    term: string
    friend: 'null' | 'true' | 'false'
}

export const UsersSearch: FC = () => {
    const dispatch = useDispatch()
    const countItems = useSelector(getCountItems)

    const initialValues: MyFormValues = {
        term: '',
        friend: 'null',
    }

    const handleSubmit = (value: MyFormValues) => {
        const convertedFriendValue = value.friend === 'null' ? null : value.friend === 'true' ? true : false
        const convertedValue = { term: value.term, friend: convertedFriendValue }
        dispatch(getUsers(countItems, 1, convertedValue))
    }

    return (
        <div className='text-center'>
            <Formik
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
}
