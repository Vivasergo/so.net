import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import usersReducer from './usersReducer'
import dialogsReducer from './dialogsReducer'
import { reducer as formReducer } from 'redux-form'
import appReducer from './appReducer'

let rootReducer = combineReducers({
    auth: authReducer,
    usersPage: usersReducer,
    userProfile: profileReducer,
    userDialogs: dialogsReducer,
    app: appReducer,
    form: formReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// let store = createStore(reducers, applyMiddleware(thunk));

//special functionality to apply browser extension Redux DevTools
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    rootReducer,
    /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
)
// @ts-ignore
window.store = store

export default store
