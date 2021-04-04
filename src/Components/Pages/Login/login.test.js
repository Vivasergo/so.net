import React from 'react'
import '@testing-library/react'
import { render, screen } from '@testing-library/react'
import LoginContainer from './LoginContainer'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../../Redux/redux-store'

describe('Login component', () => {
    it('Check for login form render', () => {
        render(
            <HashRouter>
                <Provider store={store}>
                    <LoginContainer />
                </Provider>
            </HashRouter>
        )
        // expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
        screen.debug()
    })
})
