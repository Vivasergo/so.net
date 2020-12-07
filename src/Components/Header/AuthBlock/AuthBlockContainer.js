import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAuthUserData } from '../../../Redux/authReducer';
import AuthBlock from './AuthBlock';

class AuthBlockContainer extends Component {

  componentDidMount() {

    this.props.getAuthUserData()
  }
  
  render() {
    return (
     <AuthBlock {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {auth: state.auth};
}


export default connect(mapStateToProps, {getAuthUserData})(AuthBlockContainer);
