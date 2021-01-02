import React, {Component} from "react";
import {compose} from "redux";
import Footer from "./Components/Footer/Footer";

import Header from "./Components/Header/Header";
import Mainsection from "./Components/Mainsection/Mainsection";
import {connect} from "react-redux";
import {initializeApp} from "./Redux/appReducer";
import Preloader from "./Components/common/Preloader/Preloader";

class App extends Component {

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

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    };
}

export default compose(connect(mapStateToProps, {initializeApp}))(App);

