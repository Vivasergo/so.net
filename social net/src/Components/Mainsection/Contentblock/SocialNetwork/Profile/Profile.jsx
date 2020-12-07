import React from "react";
import Preloader from "../../../../common/Preloader/Preloader";
import lookingForAJob from "../../../../../Images/LookingJob.jpg";

let Profile = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  let contacts = Array.from(Object.entries(props.profile.contacts));

  return (
    <div className="row profileBlock p-2">
      <div className="col-xs-12 col-md-3 col-lg-3">
        <img style={{width: "inherit"}} 
          src={
            props.profile.photos.small
              ? props.profile.photos.small
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnlwn0zWYxGemFG6uiE_I2Huf0014n2VNvWg&usqp=CAU"
          }
          alt=""
        />
      </div>
      <div className="col-xs-12 col-md-6">
        <h3>{props.profile.fullName}</h3>
        <p>{props.profile.aboutMe}</p>
        <div>
          {props.profile.lookingForAJob && (
            <div>
              <img className="w-25" src={lookingForAJob} alt="" />
              <p className="d-inline-block ml-2">
                {props.profile.lookingForAJobDescription}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="col-xs-12 col-md-4 col-lg-3">
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
  );
};

export default Profile;
