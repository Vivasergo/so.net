import React, {Component} from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {
    getProfile,
    getStatus,
    updateStatus,
} from "../../../Redux/profileReducer";
import {withRouter} from "react-router-dom";

class ProfileContainer extends Component {

    componentDidMount() {

        let userId = this.props.match.params.userId;
        if (!userId) {
            if (this.props.isLogged) {
                userId = this.props.authorizedUserId;
            } else {
                return this.props.history.push("/users")
            } //!Redirect
        }

        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    render() {

        return <Profile {...this.props} />;
    }
}

const mapStateToProps = (state) => ({
    profile: state.userProfile.profile,
    status: state.userProfile.status,
    authorizedUserId: state.auth.id,
    isLogged: state.auth.isLogged,
});

const withRouterProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
})(withRouterProfileContainer);
