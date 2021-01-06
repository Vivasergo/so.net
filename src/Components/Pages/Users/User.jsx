import React from "react";
import profImg from "../../../Images/user.png";
import { NavLink } from "react-router-dom";
import FollowUnfollowContainer from "../../common/FollowUnfollowBtn/FollowUnfollowContainer";

const User = (props) => {
  return (
    <>

      <div className="items-container__item user-item">
        <div className="user-item__header">
          <div className="user-item__logo">
            <NavLink to={"/profile/" + props.user.id}>
              <img src={props.user.photos.small || profImg} alt="" />
            </NavLink>
          </div>
          <div className="user-item__user-data">
            <h4>
              <NavLink to={"/profile/" + props.user.id}>{props.user.name}</NavLink>
            </h4>
            <p className="user-item__status">{props.user.status}</p>
          </div>
        </div>
        <div className="user-item__body">

          <FollowUnfollowContainer user={props.user}  />

        </div>
      </div>
    </>
  );
};

export default User;
