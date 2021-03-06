import React, { FC } from "react";
import {useState} from "react";
import {NavLink} from "react-router-dom";
import { AuthBlockContainerPropsType } from "./AuthBlockContainer";


const AuthBlock:FC<AuthBlockContainerPropsType> = (props) => {
    const [isAuthBlockClicked, setIsAuthBlockClicked] = useState(false);

    const handleClickArrowBlock = () => {
        setIsAuthBlockClicked((prevValue) => (prevValue = !prevValue));
    };

    return (
        <div className="auth-block">
            {props.auth.isLogged ? (
                <div className="overflow-hidden">
                    <span>
                          Hi, {props.auth.login}{" "}
                    </span>
                    <button
                        onClick={props.logoutUser}
                        className="btn btn-sm btn-warning ms-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path fillRule="evenodd"
                                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </button>
                </div>
            ) : (
                <>
                    <div
                        onClick={handleClickArrowBlock}
                        className="auth-block__arrow-block d-flex d-md-none align-items-center"
                    >
                        Auth{" "}
                        <span
                            className={
                                isAuthBlockClicked
                                    ? "auth-block__arrow rotate"
                                    : "auth-block__arrow"
                            }
                        />
                    </div>
                    <div
                        className={
                            isAuthBlockClicked
                                ? "auth-block__buttons d-md-flex align-items-center auth-block__buttons-mob"
                                : "auth-block__buttons d-none d-md-flex align-items-center"
                        }
                    >
                        <NavLink
                            onClick={handleClickArrowBlock}
                            to="/login"
                            type="button"
                            activeClassName=""
                            className="btn btn-outline-warning btn-sm"
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                className="bi bi-lock-fill"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z"/>
                                <path
                                    fillRule="evenodd"
                                    d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"
                                />
                            </svg>
                            Sign In
                        </NavLink>
                        <NavLink
                            onClick={handleClickArrowBlock}
                            to="/register"
                            activeClassName=""
                            type="button"
                            className="btn btn-warning btn-sm"
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                className="bi bi-globe2"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539a8.372 8.372 0 0 1-1.198-.49 7.01 7.01 0 0 1 2.276-1.52 6.7 6.7 0 0 0-.597.932 8.854 8.854 0 0 0-.48 1.079zM3.509 7.5H1.017A6.964 6.964 0 0 1 2.38 3.825c.47.258.995.482 1.565.667A13.4 13.4 0 0 0 3.508 7.5zm1.4-2.741c.808.187 1.681.301 2.591.332V7.5H4.51c.035-.987.176-1.914.399-2.741zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5H7.5v2.409c-.91.03-1.783.145-2.591.332a12.343 12.343 0 0 1-.4-2.741zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696A12.63 12.63 0 0 1 7.5 11.91v3.014c-.67-.204-1.335-.82-1.887-1.855a7.776 7.776 0 0 1-.395-.872zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964a9.083 9.083 0 0 0-1.565.667A6.963 6.963 0 0 1 1.018 8.5h2.49a13.36 13.36 0 0 0 .437 3.008zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909c.81.03 1.577.13 2.282.287-.12.312-.252.604-.395.872-.552 1.035-1.218 1.65-1.887 1.855V11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5h-2.49a13.361 13.361 0 0 0-.437-3.008 9.123 9.123 0 0 0 1.565-.667A6.963 6.963 0 0 1 14.982 7.5zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343c-.705.157-1.473.257-2.282.287V1.077c.67.204 1.335.82 1.887 1.855.143.268.276.56.395.872z"
                                />
                            </svg>
                            Register
                        </NavLink>
                    </div>
                </>
            )}
        </div>
    );
};

export default AuthBlock;
