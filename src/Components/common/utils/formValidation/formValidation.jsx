import React from "react";

//using css module
import style from "./formValidation.module.css";

//form validation rule
//if returns undefined the validation is passed
export const required = value => value ? undefined : 'The field is required!'

//visualisation of an error block
const ErrorBlock = (props) => {
    return (
        <div>
            <span className={style.errorBlockActive}>{props.error || props.warning}</span>
        </div>
    );
};

//preparing Input block with validation and error visualisation functionality
//to pass it into the attribute "component" inside the form field
export const Input = ({input, meta, ...restProps}) => {
    return (
        <div>
        <span className={meta.touched && (meta.error || meta.warning) ? style.errorBorder : ""}>
            <input {...input} {...restProps}/>
        </span>
            {meta.touched && (meta.error || meta.warning) && <ErrorBlock {...meta} />}
        </div>
    );
};

export const Textarea = ({input, meta, ...restProps}) => {
    return (
        <div>
        <span className={meta.touched && (meta.error || meta.warning) ? style.errorBorder : ""}>
            <textarea {...input} {...restProps}/>
        </span>
            {meta.touched && (meta.error || meta.warning) && <ErrorBlock {...meta} />}
        </div>
    );
};

