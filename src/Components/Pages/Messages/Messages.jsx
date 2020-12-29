import React from "react";
import DialogFormContainer from './Dialogs/DialogFormContainer';

const Messages = (props) => {
    return (
        <>

            <div>
                <h3>Messages page</h3>
                <div className={"mb-3"}>
                    {props.dialogs.map((dialog) => {
                        return <div key={dialog.id}>{dialog.message}</div>;
                    })}
                </div>
            </div>
            <DialogFormContainer/>
            <div className={"alert alert-warning mt-3"}>
                <h5 className={"alert-heading"}>Author's notice</h5>
                <hr/>
                <p>This page was created for testing next approaches/functionality:</p>
                <ul>
                    <li>Redux form (including form validation custom methods)</li>
                    <li>Redux state management</li>
                </ul>
            </div>
        </>
    );
};

export default Messages;
