import { AuthInitialStateType } from '../../../Redux/authReducer';
import { AppStateType } from '../../../Redux/redux-store';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from "../../../Redux/authReducer";
import AuthBlock from './AuthBlock';

type MapStateToPropsType={
  auth: AuthInitialStateType
}
type MapDispatchToPropsType = {
  logoutUser: ()=>void
};
type OwnProps = {}

export type AuthBlockContainerPropsType = MapStateToPropsType & MapDispatchToPropsType; 

class AuthBlockContainer extends Component<AuthBlockContainerPropsType> {

  render() {
    return (
      
     <AuthBlock {...this.props} />
    )
  }
}

const mapStateToProps = (state:AppStateType) => {
  return {auth: state.auth};
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(mapStateToProps, { logoutUser })(
  AuthBlockContainer
);
