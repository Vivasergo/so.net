import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input, require } from "../../common/utils/formValidation/formValidation";
import { Redirect } from 'react-router-dom';
import style from '../../common/utils/formValidation/formValidation.module.css'

const LoginForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"email"}
          type="text"
          component={Input}
          validate={[require]}
          name={"email"}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          type="password"
          component={Input}
          validate={[require]}
          name={"password"}
        />
      </div>
      <div>
        Keep me logged in{" "}
        <Field type={"checkbox"} component="input" name={"rememberMe"} />
      </div>
     {props.error && <div className={style.errorMessageBlock}>
        {props.error}
      </div>}
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

    if (props.isLogged) {
      return <Redirect to="/profile" />;
    }

  return (
    <section className="items-container">
      <h3>Login</h3>
      <LoginReduxForm onSubmit={onSubmit} />
    </section>
  );
};

export default Login;
