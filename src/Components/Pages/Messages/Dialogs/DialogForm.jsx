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
        <div>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
};

const ReduxDialogForm = reduxForm({ form: "dialogForm" })(DialogFormBlock);

const DialogForm = (props) => {
  const onSubmit = (formData) => {
    props.setNewMessageThunk(formData);
  };

  return <ReduxDialogForm onSubmit={onSubmit} />;
};

export default DialogForm;
