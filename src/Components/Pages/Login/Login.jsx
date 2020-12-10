import React from "react";
import { Field, reduxForm } from "redux-form";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"Login"}
          type="text"
          component="input"
          name={"login"}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          type="text"
          component="input"
          name={"password"}
        />
      </div>
      <div>
        Keep me logged in <Field type={"checkbox"} component="input" name={"rememberMe"} />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "loginForm",
})(LoginForm);

const Login = (props) => {

    const onSubmit= (formData) => {
        props.loginUser(formData);
    }

  return (
    <section className="items-container">
      <h3>Login</h3>
      <LoginReduxForm onSubmit={onSubmit} />
    </section>
  );
};

export default Login;
