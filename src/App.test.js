import React from "react";
import {render, screen} from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./Redux/redux-store";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';


it('App render test', () => {
    render(<BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,);

    expect(screen.getByText(/Net/)).toBeInTheDocument();

    screen.debug();
});

