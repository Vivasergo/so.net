import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStateType } from "../../../Redux/redux-store";
import {
  selectIsAuth,
} from "../../../Redux/Selectors/usersPage-selectors";
import { follow, unfollow } from "../../../Redux/usersReducer";
import { UserType } from "../../../Types/types";
import FollowUnfollowBtn from "./FollowUnfollowBtn";

type MapStateToPropsType = {
  isAuth: boolean;
  followingProgress: Array<number>;
};
type MapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void
};
type OwnPropsType = {
  user: UserType;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class FollowUnfollowContainer extends Component<PropsType> {
  render() {
    return <FollowUnfollowBtn {...this.props} />;
  }
}

//mapping state data stored in Redux Store to send it via Redux connect HOC and use it
//inside the wrapped component through the props
//some kind of Context functionality
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    isAuth: selectIsAuth(state), //using selectors/reselect
    followingProgress: state.usersPage.followingProgress,
  };
};

//composing the wrappers
export default compose(
  connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    OwnPropsType,
    AppStateType
  >(mapStateToProps, {
    //refactoring entry of mapDispatchToProps = (dispatch) => {return {follow: () => dispatch(followThunkCreator)}}
    follow,
    unfollow,
  })
)(FollowUnfollowContainer);
