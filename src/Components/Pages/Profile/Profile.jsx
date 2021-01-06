import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import UnauthorizedUserProfile from "./UnauthorizedUserProfile";
import AuthorizedUserProfile from "./AuthorizedUserProfile";
import SocialNetLinks from "./SocialNetLinks/SocialNetLinks";

const Profile = (props) => {
    const currentUserProfileId = props.match.params.userId;

    //rendering preloader component while waiting the server answer and promise resolving
    if (!props.profile) {
        return <Preloader/>;
    }

    return (
        <section className="items-container">
            <h3>Profile</h3>
            <div className="container items-container__item profile-container">
                <div className="row">
                    {props.authorizedUserId == currentUserProfileId ?
                        <AuthorizedUserProfile {...props} currentUserProfileId={currentUserProfileId}/> :
                        <UnauthorizedUserProfile {...props}/>}

                    <SocialNetLinks contacts={props.profile.contacts}/>
                </div>
            </div>
        </section>
    );
};

export default Profile;
