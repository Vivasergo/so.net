import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import profImg from "../../../Images/user.png";
import ProfileStatus from "./ProfileStatus.jsx";

const Profile = (props) => {

      if (!props.profile) {
    return <Preloader />;
  }
const currentUserProfileId = props.match.params.userId;

  let contacts = Array.from(Object.entries(props.profile.contacts));

  return (
    <section className="items-container">
      <h3>{props.profile.fullName}</h3>
      <div className="items-container__item profile-container">
        <div className="profile-container__big-img">
          <img
            src={
              props.profile.photos.large ? props.profile.photos.large : profImg
            }
            alt=""
          />
        </div>
        <ProfileStatus
          currentUserProfileId={currentUserProfileId}
          authorizedUserId={props.authorizedUserId}
          status={props.status}
          updateStatus={props.updateStatus}
        />

        {props.profile.lookingForAJob && (
          <div className="profile-container__looking-job">
            <span className="badge badge-info">Looking for a job</span>{" "}
            <div className="profile-container__job-description">
              {props.profile.lookingForAJobDescription}
            </div>
          </div>
        )}

        <div className="profile-container__contacts">
          <ul>
            {contacts.map((item, index) => {
              return (
                item[1] && (
                  <li key={index}>
                    <a href={item[1]}>{item[0]}</a>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Profile;
