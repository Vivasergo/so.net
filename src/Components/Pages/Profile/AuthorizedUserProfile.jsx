import React from "react";
import profImg from "../../../Images/user.png";
import ProfileStatus from "./ProfileStatus";

const AuthorizedUserProfile = (props) => {

    return (
        <>
            <h3>Welcome to your personal account, {props.profile.fullName}</h3>
            <div className={"col-md-7 col-12"}>
                <div className="profile-container__big-img">
                    <img className={"mb-3 ms-3"}
                         src={
                             props.profile.photos.large ? props.profile.photos.large : profImg
                         }
                         alt=""
                    />
                    <div className="alert alert-warning alert-dismissible fade show border border-warning" role="alert">
                        To change the avatar please chose another file below
                        <button type="button" className="btn-close p-1" data-bs-dismiss="alert"
                                aria-label="Close"></button>
                    </div>
                    <div><input type="file"/></div>
                </div>
                <hr/>
                <ProfileStatus
                    currentUserProfileId={props.currentUserProfileId}
                    authorizedUserId={props.authorizedUserId}
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
                <hr className="d-md-none"/>
                {props.profile.lookingForAJob && (
                    <div className="profile-container__looking-job">
                        <span className="badge bg-warning text-dark">Looking for a job</span>{" "}
                        <div className="profile-container__job-description">
                            {props.profile.lookingForAJobDescription}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AuthorizedUserProfile;
