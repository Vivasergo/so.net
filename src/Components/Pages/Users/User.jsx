import React from "react";
import profImg from "../../../Images/user.png";
import { NavLink } from "react-router-dom";

const User = ({ user, followingProgress, unfollow, follow, isAuth }) => {
  return (
    <>
      <div className="items-container__item user-item">
        <div className="user-item__header">
          <div className="user-item__logo">
            <NavLink to={"/profile/" + user.id}>
              <img src={user.photos.small || profImg} alt="" />
            </NavLink>
          </div>
          <div className="user-item__user-data">
            <h4>
              <NavLink to={"/profile/" + user.id}>{user.name}</NavLink>
            </h4>
            <p className="user-item__status">{user.status}</p>
          </div>
        </div>
        <div className="user-item__body">
          {!isAuth ? (
            <div>"Sign in or register to follow the users"</div>
          ) : user.followed ? (
            <button
              disabled={followingProgress.some((id) => id === user.id)}
              onClick={() => unfollow(user.id)}
              type="button"
              className="btn btn-warning"
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingProgress.some((id) => id === user.id)}
              onClick={() => follow(user.id)}
              type="button"
              className="btn btn-primary"
            >
              Follow
            </button>
          )}
          {}
        </div>
      </div>
    </>
  );
};

export default User;
