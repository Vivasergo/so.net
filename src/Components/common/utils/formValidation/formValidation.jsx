import React from "react";
import style from "./formValidation.module.css";

export const require = (value) => {
  if (value && value !== "") {
    return undefined;
  }
  return "The field is required!";
};

// const maxLength = (value) => {
//   if (value && value !== "") {
//     return undefined;
//   }
//   return "The field is required!";
// };

const ErrorBlock = (props) => {

  return (
    <div>
        <span className={style.errorBlockActive}>{props.error}</span>
    </div>
  );
};

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
