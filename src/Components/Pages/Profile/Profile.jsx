import React, {useEffect, useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import UnauthorizedUserProfile from "./UnauthorizedUserProfile";
import AuthorizedUserProfile from "./AuthorizedUserProfile";
import SocialNetLinks from "./SocialNetLinks/SocialNetLinks";
import ErrorBlock from "../../common/Errors/ErrorBlock";

const Profile = (props) => {

    const [editMode, seteditMode] = useState(false);

    const goToEditMode = () => {
        seteditMode(true)
    }

    const exitEditMode = () => {
        seteditMode(false)
    }

    //If profile was updated then turning off the edit mode and rendering updated profile
    //then resetting redux state isProfileUpdated property
    useEffect(() => {
        if (props.isProfileUpdated) {
            seteditMode(false);
            props.resetUpdateProfile();
        }
    }, [props.isProfileUpdated])

    useEffect(()=>{
        if(!props.isLogged){
            seteditMode(false);
        }
    },[props.isLogged])

    const currentUserProfileId = props.match.params.userId;

    //rendering preloader component while waiting the server answer and promise resolving
    if (!props.profile || props.isProfileDataLoading) {
        return <Preloader/>;
    }

    return (
        <section className="items-container">
            <h3>Profile</h3>
            <div className="container items-container__item profile-container">
                <div className="row">

                    {/*if edit mode is true rendering authorized user profile edit page*/}

                    {editMode ? <AuthorizedUserProfile {...props}
                                                       exitEditMode={exitEditMode}
                                                       currentUserProfileId={currentUserProfileId}/>
                        :
                        <><UnauthorizedUserProfile {...props}
                                                   goToEditMode={goToEditMode}
                                                   isOwner={props.authorizedUserId == currentUserProfileId}/>
                            <SocialNetLinks contacts={props.profile.contacts}/></>}
                </div>
            </div>
        </section>
    );
};

export default Profile;
