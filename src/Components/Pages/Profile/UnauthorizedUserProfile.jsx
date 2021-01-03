import React from "react";
import profImg from "../../../Images/user.png";

const UnauthorizedUserProfile = (props) => {

    return (
        <>
            <h3>{props.profile.fullName}</h3>
            <div className={"col-md-7 col-12"}>
                <div className="profile-container__big-img">
                    <img className={"mb-3 ms-3"}
                        src={
                            props.profile.photos.large ? props.profile.photos.large : profImg
                        }
                        alt=""
                    />
                </div>
                <div>
                    <div className="profile-container__status">
                        <span>{props.status || "No status yet"}</span>
                    </div>
                </div>

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

export default UnauthorizedUserProfile;
