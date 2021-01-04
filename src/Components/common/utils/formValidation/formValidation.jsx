import React from "react";

//using css module
import style from "./formValidation.module.css";

//form validation rule
//if returns undefined the validation is passed
export const require = (value) => {
  if (value && value !== "") {
    return undefined;
  }
  return "The field is required!";
};

//visualisation of error block
const ErrorBlock = (props) => {

  return (
    <div>
        <span className={style.errorBlockActive}>{props.error}</span>
    </div>
  );
};

//preparing Input block with validation and error visualisation functionality
//to pass it into the attribute "component" inside the form field
export const Input = ({ input, meta, ...restProps }) => {
  return (
    <div>
      <input
        {...input}
        {...restProps}
        className={meta.touched && meta.error ? style.errorBorder : ""}
      />
      {meta.touched && meta.error && <ErrorBlock {...meta} /> }
    </div>
  );
};
