import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getProfile } from "../../../../../Redux/profileReducer";
import { withRouter } from "react-router-dom";

class ProfCont extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) userId = "2";

    this.props.getProfile(userId);
  }

  render() {
    return <Profile {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.userProfile.profile,
  };
};

let WithURLContainerComponent = withRouter(ProfCont);

export default connect(mapStateToProps, { getProfile })(
  WithURLContainerComponent
);

