import React from "react";
import {useState} from "react";
import {NavLink} from "react-router-dom";

const NavMenu = (props) => {
    const [isClickedBurger, setIsClickedBurger] = useState(false);

    const handleClickBurger = () => {
        setIsClickedBurger((prevValue) => (prevValue = !prevValue));
    };

    let navMenu = [
        {
            title: "Users",
            path: "/users",
            icon: "fas fa-users",
        },
        {
            title: "Messages",
            path: "/messages",
            icon: "fas fa-envelope-open-text",
        },
        {
            title: "My profile",
            path: "/profile/" + props.authId,
            icon: "far fa-address-card",
        },
        {
            title: "Profile",
            path: "/profile",
            icon: "far fa-address-card",
        },
        {
            title: "News",
            path: "/under-construction/news",
            icon: "far fa-newspaper",
        },
        {
            title: "Settings",
            path: "/under-construction/settings",
            icon: "fas fa-cogs",
        },
    ];

    if (props.isLogged) {
        navMenu = navMenu.filter((item) => item.title != "Profile")
    } else {
        navMenu = navMenu.filter((item) => item.title != "My profile")
    }

    return (
        <aside className="col-2 col-md-3">
            <div className={
                isClickedBurger
                    ? "nav-menu d-flex active"
                    : "nav-menu d-flex"
            }
                     >
                <nav
                    className={
                        isClickedBurger
                            ? "nav-block d-md-block active"
                            : "nav-block d-md-block not-active"
                    }
                >
                    <ul className="nav-block__menu">
                        {navMenu.map((list) => {
                            return (

                                <li key={list.title} className="nav-block__list">
                                    <NavLink to={list.path}>
                                        <i className={list.icon}></i>
                                        {list.title}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div
                    onClick={handleClickBurger}
                    className={
                        isClickedBurger
                            ? "nav-burger ml-3 mt-3 d-block d-md-none active"
                            : "nav-burger ml-3 mt-3 d-block d-md-none"
                    }
                >
                    <span></span>
                </div>
            </div>
        </aside>
    );
};

export default NavMenu;
