import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from "../../../Redux/authReducer";
import AuthBlock from './AuthBlock';

class AuthBlockContainer extends Component {

  
  render() {
    return (
     <AuthBlock {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {auth: state.auth};
}


export default connect(mapStateToProps, { logoutUser })(
  AuthBlockContainer
);
