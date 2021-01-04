import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

//custom HOC for unauthorized users redirection
const withAuthRedirect = (Component) => {

  let mapStateToProps = (state) => ({
    isLogged: state.auth.isLogged,
  });

  const RedirectComponent = (props) => {
    if (!props.isLogged) {
      return <Redirect to="/login" />;
    }
    return <Component {...props} />;
  };

  return connect(mapStateToProps)(RedirectComponent);
};

export default withAuthRedirect;
