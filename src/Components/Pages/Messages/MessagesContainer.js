import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { setNewMessageThunk } from "../../../Redux/dialogsReducer";
import Messages from "./Messages";
import withAuthRedirect from "./../../../hoc/withAuthRedirect";

class MessagesContainer extends Component {
  render() {
    return <Messages {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  dialogs: state.userDialogs.dialogs,
});

export default compose(
  connect(mapStateToProps, { setNewMessageThunk }),
  withAuthRedirect
)(MessagesContainer);
