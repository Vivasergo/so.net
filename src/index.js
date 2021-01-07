import React from "react";
import store from "./Redux/redux-store";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";

import "./CSS/style.css";

import { Provider } from "react-redux";


  ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>,
    document.getElementById("root")
  )


