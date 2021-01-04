import * as React from 'react';
import {connect} from "react-redux";
import NavMenu from "./NavMenu";

const NavMenuContainer = (props) => {

    return (
        <NavMenu {...props} />
    );
};

//mapping state data stored in Redux Store to send it via Redux connect HOC and use it
//inside the wrapped component through the props
//some kind of Context functionality
const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.isLogged,
        authId: state.auth.id
    }
}

//connect to the Redux Store
export default connect(mapStateToProps)(NavMenuContainer);