import React from "react";

const FollowUnfollowBtn = ({user, followingProgress, unfollow, follow, isAuth}) => {

    return (
        <div>

            {/*follow/unfollow functionality including button disabling while waiting the server answer*/}
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
    );
};

export default FollowUnfollowBtn;
