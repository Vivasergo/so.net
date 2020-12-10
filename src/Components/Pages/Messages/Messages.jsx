import React from "react";
import DialogFormContainer from './Dialogs/DialogFormContainer';

const Messages = (props) => {
  return (
    <>
    
      <div>
        <h3>Messages page</h3>
        <div>
          {props.dialogs.map((dialog) => {
            return <div key={dialog.id}>{dialog.message}</div>;
          })}
        </div>
      </div>
      <DialogFormContainer />
    </>
  );
};

export default Messages;
