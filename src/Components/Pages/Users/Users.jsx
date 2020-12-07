import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import profImg from "../../../Images/user.png";
import s from "./users.module.css";
import { NavLink } from "react-router-dom";
import { Pagination } from "@material-ui/lab";

const Users = (props) => {

    let totalSheets = Math.ceil(props.totalPages / props.countItems);

 let handlePageLinkClick = (e, page) => {
   props.getUsers(props.countItems, page);
 };


  return (
    <>
      {props.isLoading && <Preloader />}

      <section className="items-container">
        <h3>Users</h3>

        <div className={s.paginationBlock}>
          <Pagination
            onChange={handlePageLinkClick}
            count={totalSheets}
            siblingCount={2}
            color={"primary"}
            variant="outlined"
            shape={"rounded"}
          />
        </div>
        {props.users.map((user) => {
          return (
            <div key={user.id} className="items-container__item user-item">
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
                {user.followed ? (
                  <button
                    disabled={props.followingProgress.some(
                      (id) => id === user.id
                    )}
                    onClick={() => props.unfollow(user.id)}
                    type="button"
                    className="btn btn-warning"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={props.followingProgress.some(
                      (id) => id === user.id
                    )}
                    onClick={() => props.follow(user.id)}
                    type="button"
                    className="btn btn-primary"
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <div className={s.paginationBlock}>
          <Pagination
            onChange={handlePageLinkClick}
            count={totalSheets}
            siblingCount={2}
            color={"primary"}
            variant="outlined"
            shape={"rounded"}
          />
        </div>
      </section>
    </>
  );
};

export default Users;
