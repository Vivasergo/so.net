import React, {useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./users.module.css";
import { Pagination } from "@material-ui/lab";
import User from "./User";
import useWindowSize from "../../common/utils/ShowWindowDimensions/useWindowSize";

const Users = (props) => {
  const [page, setPage] = useState(1);

  //custom Hook to control window width change
  const [windowWidth] = useWindowSize();

  let totalSheets = Math.ceil(props.totalPages / props.countItems);

  let handlePageLinkClick = (_, page) => {
    props.getUsers(props.countItems, page);
    setPage(page)
  };

  return (
    <>
      {props.isLoading && <Preloader />}

      <section className="items-container">
        <h3>Users</h3>

        <div className={s.paginationBlock}>
          <Pagination
            onChange={handlePageLinkClick}
            page={page}
            count={totalSheets}
            siblingCount={windowWidth <= 930 ? 0 : 2}
            color={"primary"}
            variant="outlined"
            shape={"rounded"}
          />
        </div>
        {props.users.map((user) => {

          //Don't show authorised user block among the other users
          return props.authUserId==user.id ? "" :
           (
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
            page={page}
            count={totalSheets}
            siblingCount={windowWidth <= 930 ? 0 : 2}
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
