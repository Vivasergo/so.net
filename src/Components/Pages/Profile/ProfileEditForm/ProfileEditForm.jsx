import React from "react";
import {Field, reduxForm} from "redux-form";
import style from '../../../common/utils/formValidation/formValidation.module.css'
import {Input, required, Textarea} from "../../../common/utils/formValidation/formValidation";

const ProfileEditFormCont = (props) => {

    //preparing data received from the server for an appropriate condition to use
    let contacts = Array.from(Object.entries(props.profile.contacts));

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label>Full name:</label>
                <Field
                    type="text"
                    component={Input}
                    name={"fullName"}
                    validate={[required]}
                    className="w-100"
                />
            </div>
            <div className="mt-2">
                <label>Are you looking for a job?</label>
                <Field
                    type="checkbox"
                    component={Input}
                    name={"lookingForAJob"}
                />
            </div>
            <div className="mt-2">
                <label>Description of the job you are looking for:</label>
                <Field
                    type="textarea"
                    component={Textarea}
                    name={"lookingForAJobDescription"}
                    className={"w-100"}
                    validate={[required]}
                />
            </div>
            <div className="mt-2">
                <label>About me:</label>
                <Field
                    className={"w-100"}
                    type="textarea"
                    component={Textarea}
                    name={"aboutMe"}
                    validate={[required]}
                />
            </div>


            <hr/>

            <div className={"mt-2 container"}>
               <h3>Contacts:</h3>
               <div className="row">
                     {contacts.map(([name]) => { 
                        return <div className={"mt-1"} key={name}>
                            <label>{name}:</label>
                            <div>
                                <Field className={"col-12"}
                                       type={"text"}
                                       component={Input}
                                       name={"contacts."+name}
                                />
                            </div>
                        </div>
                    })}
                </div>
            </div>

            {props.error && <div className={style.errorMessageBlock}>
                {props.error}
            </div>}
            <div className="d-grid mt-3 col-6 mx-auto">
                <button className="btn btn-primary" type="submit">Save changes</button>
            </div>
        </form>
    );
};

const ProfileEditReduxForm = reduxForm({
    form: "profile-edit-form",
})(ProfileEditFormCont);

const ProfileEditForm = (props) => {

    const onSubmit = (formData) => {
// console.log(formData)
        props.updateProfile(formData)
        // props.exitEditMode();
    }

    return (
        <ProfileEditReduxForm {...props} onSubmit={onSubmit}/>
    );
};

export default ProfileEditForm;
