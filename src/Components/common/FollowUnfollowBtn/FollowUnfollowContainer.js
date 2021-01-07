import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getUsersItems, isAuth } from "../../../Redux/Selectors/usersPage-selectors";
import { follow, unfollow } from "../../../Redux/usersReducer";
import FollowUnfollowBtn from "./FollowUnfollowBtn";

class FollowUnfollowContainer extends Component {

  render() {
    return <FollowUnfollowBtn {...this.props} />;
  }
}

//mapping state data stored in Redux Store to send it via Redux connect HOC and use it
//inside the wrapped component through the props
//some kind of Context functionality
const mapStateToProps = (state) => {

  return {
    isAuth: isAuth(state), //using selectors/reselect
    followingProgress: state.usersPage.followingProgress,
  };
};

//composing the wrappers
export default compose(
  connect(mapStateToProps, {
      //refactoring entry of mapDispatchToProps = (dispatch) => {return {follow: () => dispatch(followThunkCreator)}}
    follow,
    unfollow,
  }),
)(FollowUnfollowContainer);
