import React, { Component } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
	getProfile,
	getStatus,
	resetUpdateProfile,
	updateProfile,
	updateStatus,
	uploadNewAvatar,
} from "../../../Redux/profileReducer";
import { withRouter } from "react-router-dom";

class ProfileContainer extends Component {
	//encapsulation of block code for checking out what kind of user is profile page
	//and redirect of unauthorized user when he is going to the exact /profile URL
	getUserData() {
		let userId = this.props.match.params.userId;
		if (!userId) {
			if (this.props.isLogged) {
				userId = this.props.authorizedUserId;
			} else {
				return this.props.history.push("/users");
			} //!Redirect via withRouter > history
		}
		this.props.getProfile(userId);
		this.props.getStatus(userId);
	}

	componentDidMount() {
		this.getUserData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.userId != this.props.match.params.userId) {
			this.getUserData();
		}
	}

	render() {
		return <Profile {...this.props} />;
	}
}

//mapping state data stored in Redux Store to send it via Redux connect HOC and use it
//inside the wrapped component through the props
//some kind of Context functionality
const mapStateToProps = (state) => ({
	// photos:state.userProfile.profile.photos,
	profile: state.userProfile.profile,
	status: state.userProfile.status,
	authorizedUserId: state.auth.id,
	isLogged: state.auth.isLogged,
	isProfileUpdated: state.userProfile.isProfileUpdated,
	isProfileDataLoading: state.userProfile.isProfileDataLoading,
});

//withRouter HOC to use props.match.params
const withRouterProfileContainer = withRouter(ProfileContainer);

//connection to the Redux Store
export default connect(mapStateToProps, {
	//refactoring entry of mapDispatchToProps = (dispatch) => {return {updateStatus: () => dispatch(updateStatusThunkCreator)}}
	getProfile,
	getStatus,
	updateStatus,
	uploadNewAvatar,
	updateProfile,
	resetUpdateProfile,
})(withRouterProfileContainer);
