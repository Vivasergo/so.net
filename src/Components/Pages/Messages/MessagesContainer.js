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

//mapping state data stored in Redux Store to send it via Redux connect HOC and use it
//inside the wrapped component through the props
//some kind of Context functionality
const mapStateToProps = (state) => ({
  dialogs: state.userDialogs.dialogs,
});

//connection to the Redux Store
//applying
export default compose(
  connect(mapStateToProps, { setNewMessageThunk }),
  withAuthRedirect
)(MessagesContainer);
