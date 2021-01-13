import React from "react";
import profImg from "../../../Images/user.png";

const UnauthorizedUserProfile = (props) => {

    return (
        <>
            <h3>{props.profile.fullName}</h3>

            <div className={"col-md-7 col-12"}>
                <div className="profile-container__big-img">
                    <div className={"text-center text-sm-start"}>
                        <img className={"rounded mb-3 ms-md-3"}
                             src={
                                 props.profile.photos.large ? props.profile.photos.large : profImg
                             }
                             alt=""
                        />
                    </div>
                </div>

                {/*if the profile's owner is on the page then edit profile button is available*/}

                {props.isOwner && <div className={"d-flex"}>
                    <button onClick={props.goToEditMode} className={"btn btn-sm btn-warning w-50 mx-auto"}>Edit your
                        profile
                    </button>
                </div>}


                <div>
                    <div className="profile-container__status">
                        <span>{props.status || "No status yet"}</span>
                        <hr/>
                    </div>
                </div>

                {props.profile.lookingForAJob && (
                    <div>
                         <div className="profile-container__looking-job">
                        <span className="badge bg-info text-dark">Looking for a job</span>{" "}
                        <div className="profile-container__job-description">
                            {props.profile.lookingForAJobDescription}
                        </div>
                        <hr/>
                    </div>
                    </div>
                )}

                {props.profile.aboutMe && (
                    <div>
                        <div className="profile-container__abotMe">
                            <h5>About me:</h5>
                        <div>{props.profile.aboutMe}</div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UnauthorizedUserProfile;
