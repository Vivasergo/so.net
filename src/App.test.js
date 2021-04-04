import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/redux-store'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

it('App render test', () => {
    render(
        <HashRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </HashRouter>
    )

    expect(screen.getByAltText(/loading/i)).toBeInTheDocument()

    // screen.debug();
})
