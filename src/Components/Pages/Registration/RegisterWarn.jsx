import React from "react";


const RegisterWarn = (props) => {

    return (
        <div className={"alert alert-danger mt-3"}>
            <h4 className={"alert-heading text-center"}>Registration functionality is not implemented yet</h4>
            <hr/>
            <div>To test authorized user functionality please sign in with following data:</div>

            <table className={"mt-2"}>
                <tbody>
                <tr>
                    <td>Email:</td>
                    <td className={"pl-2 text-break"}><strong>free@samuraijs.com</strong></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td className={"pl-2"}><strong>free</strong></td>
                </tr>
                </tbody>

            </table>
        </div>
    )
};

export default RegisterWarn;
