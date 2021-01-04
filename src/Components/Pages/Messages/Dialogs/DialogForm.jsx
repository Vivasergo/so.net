import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input, require } from "../../../common/utils/formValidation/formValidation";

const DialogFormBlock = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field validate={[require]} component={Input} name="message" placeholder="Enter new message" />
        </div>
        <div className={"mt-2"}>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
};

//Redux Form connection (wrapper for the form)
const ReduxDialogForm = reduxForm({ form: "dialogForm" })(DialogFormBlock);

//dialog container to pass the thunk function, obtained via the props to the onSubmit form method
const DialogForm = (props) => {
  const onSubmit = (formData) => {
    props.setNewMessageThunk(formData);
  };

  return <ReduxDialogForm onSubmit={onSubmit} />;
};

export default DialogForm;
