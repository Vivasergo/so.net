import React, {useEffect} from "react";
import Preloader from "../../common/Preloader/Preloader";
import UnauthorizedUserProfile from "./UnauthorizedUserProfile";
import AuthorizedUserProfile from "./AuthorizedUserProfile";
import {NavLink} from "react-router-dom";

const Profile = (props) => {
    const currentUserProfileId = props.match.params.userId;

    //rendering preloader component while waiting the server answer and promise resolving
    if (!props.profile) {
        return <Preloader/>;
    }

// console.log(props.profile.photos.large)

    //preparing data received from the server for an appropriate condition to use
    
    let contacts = Array.from(Object.entries(props.profile.contacts));
    console.log(props.profile.contacts)

// if(!contacts.length){
//     contacts = [{"Facebook":"facebook.com"}]
//     }

    return (
        <section className="items-container">
            <h3>Profile</h3>
            <div className="container items-container__item profile-container">
                <div className="row">

                    {props.authorizedUserId == currentUserProfileId ?
                        <AuthorizedUserProfile {...props} currentUserProfileId={currentUserProfileId}/> :
                        <UnauthorizedUserProfile {...props}/>}

                    <div className="col-md-5 col-12 profile-container__contacts">
                        <ul className="list-group">
                            {contacts.map((item, index) => {
                                return (
                                    // item[1] && 
                                    (
                                        <li key={index} className="list-group-item list-group-item-action ">
                                            <NavLink to={item[1] || "/"}>{item[0]}</NavLink>
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
