import React, {Component} from "react";
import {compose} from "redux";
import Footer from "./Components/Footer/Footer";

import Header from "./Components/Header/Header";
import Mainsection from "./Components/Mainsection/Mainsection";
import {connect} from "react-redux";
import {initializeApp} from "./Redux/appReducer";
import Preloader from "./Components/common/Preloader/Preloader";

class App extends Component {

    //initializing app after first render - dispatching initial necessary for most components data to the Redux Store
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="appWrap">
                <Header/>
                <Mainsection/>
                <Footer/>
            </div>
        );
    }
}

//mapping state data stored in Redux Store to send it via Redux connect HOC and use it
//inside the wrapped component through the props
//some kind of Context functionality
const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    };
}
//connection to the Redux Store
//composing the wrappers
export default compose(connect(mapStateToProps,
    //refactoring entry of mapDispatchToProps = (dispatch) => {return {initializeApp: () => dispatch(initializeAppThunkCreator)}}
    {initializeApp}))(App);

