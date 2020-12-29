import * as React from 'react';
import {connect} from "react-redux";
import NavMenu from "./NavMenu";

const NavMenuContainer = (props) => {

    return (
        <NavMenu {...props} />
    );
};

const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.isLogged,
        authId: state.auth.id
    }
}

export default connect(mapStateToProps,)(NavMenuContainer);