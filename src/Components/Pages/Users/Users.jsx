import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./users.module.css";
import { Pagination } from "@material-ui/lab";
import User from "./User";

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
            <User
              key={user.id}
              user={user}
              followingProgress={props.followingProgress}
              unfollow={props.unfollow}
              follow={props.follow}
              isAuth={props.isAuth}
            />
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
