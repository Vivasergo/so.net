import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getUsersItems, isAuth } from "../../../Redux/Selectors/usersPage-selectors";

import { follow, getUsers, setCurrentPage, unfollow } from "../../../Redux/usersReducer";
import Users from "./Users";

class UsersContainer extends Component {

    //query users from server after first component render
    componentDidMount() {
    this.props.getUsers(this.props.countItems);
  }

  render() {
    return <Users {...this.props} />;
  }
}

//mapping state data stored in Redux Store to send it via Redux connect HOC and use it
//inside the wrapped component through the props
//some kind of Context functionality
const mapStateToProps = (state) => {
  return {
      authUserId: state.auth.id,
    isAuth: isAuth(state), //using selectors/reselect
    users: getUsersItems(state), //using selectors/reselect
    currentPage: state.usersPage.currentPage,
    countItems: state.usersPage.countItems,
    totalPages: state.usersPage.totalPages,
    isLoading: state.usersPage.isLoading,
    followingProgress: state.usersPage.followingProgress,
  };
};

//composing the wrappers
export default compose(
  connect(mapStateToProps, {
      //refactoring entry of mapDispatchToProps = (dispatch) => {return {follow: () => dispatch(followThunkCreator)}}
    follow,
    unfollow,
    setCurrentPage,
    getUsers,
  }),
)(UsersContainer);
