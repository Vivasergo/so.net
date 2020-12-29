import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input, require} from "../../common/utils/formValidation/formValidation";
import {Redirect} from 'react-router-dom';
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
            <div className="mt-2">
                <Field
                    placeholder={"Password"}
                    type="password"
                    component={Input}
                    validate={[require]}
                    name={"password"}
                />
            </div>
            <div className="mt-2">
                Keep me logged in{" "}
                <Field type={"checkbox"} component="input" name={"rememberMe"}/>
            </div>
            {props.error && <div className={style.errorMessageBlock}>
                {props.error}
            </div>}
            <div className="mt-2">
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({
    form: "loginForm",
})(LoginForm);

const Login = (props) => {

    const onSubmit = (formData) => {
        props.loginUser(formData);
    }

    if (props.isLogged) {
        return <Redirect to="/profile"/>;
    }

    return (
        <section className="items-container">
            <h3>Login</h3>
            <LoginReduxForm onSubmit={onSubmit}/>

            <div className={"alert alert-danger mt-3"}>
                <h4 className={"alert-heading text-center"}>Registration functionality is not implemented yet</h4>
                <hr/>
                <div>To test authorized user functionality please sign in with following data:</div>

                <table className={"mt-2"}>
                    <tbody>
                    <tr>
                        <td>Email:</td>
                        <td className={"pl-2 text-break"}><strong>react.developer@t.pl</strong></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td className={"pl-2"}><strong>test123456##</strong></td>
                    </tr>
                    </tbody>

                </table>
            </div>
        </section>
    );
};

export default Login;
