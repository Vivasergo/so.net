import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../../../../hoc/withAuthRedirect";
import {
  setCurrentPage,
  follow,
  unfollow,
  getUsers,
} from "../../../../../Redux/usersReducer";
import Users from "./Users";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.countItems);
  }

  render() {
    return <Users {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.items,
    currentPage: state.usersPage.currentPage,
    countItems: state.usersPage.countItems,
    totalPages: state.usersPage.totalPages,
    isLoading: state.usersPage.isLoading,
    followingProgress: state.usersPage.followingProgress,
  };
};

//connect - wrapper function for connecting component container to context, using react-redux,
//first and second arguments are objects which become the props in component

// вместо mapDispatchToProps, передаем вторым аргументом в connect объект,
// где свойства будут переданы в props, а их значения это action creators.
//Поскольку имя свойства и имя экшен креэйтора совпадает, то можно приминить
//сокращенную запись, т.е. не setUsers: setUsers, а просто setUsers

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    getUsers,
  }),
  withAuthRedirect
)(UsersContainer);
