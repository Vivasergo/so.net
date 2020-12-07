import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAuthUserData } from "../../../Redux/authReducer";
import Topheader from "./Topheader";

class TopheaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthUserData();
  }

  render() {

    return (
      <>
        <Topheader {...this.props} />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    login: state.auth.login,
    // smallPhoto: state.auth.smallPhoto
  };
};

let WithURLTopheaderContainer = withRouter(TopheaderContainer);

export default connect(mapStateToProps, { getAuthUserData })(
  WithURLTopheaderContainer
);
