import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import UnauthorizedUserProfile from "./UnauthorizedUserProfile";
import AuthorizedUserProfile from "./AuthorizedUserProfile";
import {NavLink} from "react-router-dom";

const Profile = (props) => {
    const currentUserProfileId = props.match.params.userId;

    if (!props.profile) {
        return <Preloader/>;
    }

    let contacts = Array.from(Object.entries(props.profile.contacts));

    return (
        <section className="items-container">
            <h3>Profile</h3>
            <div className="container items-container__item profile-container">
                <div className="row">

                    {props.authorizedUserId == currentUserProfileId ?
                        <AuthorizedUserProfile {...props} currentUserProfileId={currentUserProfileId}/> :
                        <UnauthorizedUserProfile {...props}/>}

                    <div className="col-md-5 col-12 profile-container__contacts">
                        <ul>
                            {contacts.map((item, index) => {
                                return (
                                    item[1] && (
                                        <li key={index}>
                                            <NavLink to={item[1]}>{item[0]}</NavLink>
                                        </li>
                                    )
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
