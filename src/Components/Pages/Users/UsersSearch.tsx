import React, { FC } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import s from './users.module.css'
import { useDispatch } from 'react-redux'

const usersSearchValidationSchema = Yup.object().shape({
    term: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!'),
})

type Props = {
    countItems: number
    getUsers: (countItems: number, page?:number, term?:string, friend?:string) => void
}

interface MyFormValues {
    term: string
    friend: string
}

export const UsersSearch: FC<Props> = ({ getUsers, countItems }) => {
    const dispatch = useDispatch()
    const initialValues: MyFormValues = {
        term: '',
        friend: 'null',
    }
    return (
        <div className='text-center'>
            <Formik
                initialValues={initialValues}
                validationSchema={usersSearchValidationSchema}
                onSubmit={({ term, friend }) => {
                    dispatch(getUsers(countItems, 1, term, friend))
                }}>
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
