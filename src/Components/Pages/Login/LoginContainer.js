import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../../Redux/authReducer";
import Login from "./Login";

class LoginContainer extends Component {
  render() {
    
    return (
      <div>
        <Login {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
});

export default connect(mapStateToProps, { loginUser })(LoginContainer);
