import React, { Component } from 'react'
import { compose } from 'redux'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Mainsection from './Components/Mainsection/Mainsection'
import { connect } from 'react-redux'
import { errorGenerate, errorReset, initializeApp } from './Redux/appReducer'
import Preloader from './Components/common/Preloader/Preloader'
import ErrorBlock from './Components/common/Errors/ErrorBlock'
import { AppStateType } from './Redux/redux-store'
import { AppErrorType } from './Types/types'

type MapStateToPropsType = {
    initialized: boolean
    appError: AppErrorType | null
}
type MapDispatchToPropsType = {
    initializeApp: () => void
    errorGenerate: () => void
    errorReset: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class App extends Component<PropsType> {
    //initializing app after first render - dispatching initial necessary for most components data to the Redux Store
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='appWrap'>
                {this.props.appError && (
                    <ErrorBlock error={this.props.appError} errorReset={this.props.errorReset} />
                )}
                <Header />
                <Mainsection />
                <Footer />
            </div>
        )
    }
}

//mapping state data stored in Redux Store to send it via Redux connect HOC and use it
//inside the wrapped component through the props
//some kind of Context functionality
const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized,
        appError: state.app.appError,
    }
}
//connection to the Redux Store
//composing the wrappers
export default compose(
    connect(
        mapStateToProps,
        //refactoring entry of mapDispatchToProps = (dispatch) => {return {initializeApp: () => dispatch(initializeAppThunkCreator)}}
        { initializeApp, errorGenerate, errorReset }
    )
)(App)
