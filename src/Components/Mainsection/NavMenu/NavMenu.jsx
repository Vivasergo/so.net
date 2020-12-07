import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  const [isClickedBurger, setIsClickedBurger] = useState(false);

  const handleClickBurger = () => {
    setIsClickedBurger((prevValue) => (prevValue = !prevValue));
  };

  const navMenu = [
    {
      title: "Users",
      path: "/users",
      icon: "fas fa-users",
    },
    {
      title: "Profile",
      path: "/profile",
      icon: "far fa-address-card",
    },
    {
      title: "Messages",
      path: "/messages",
      icon: "fas fa-envelope-open-text",
    },
    {
      title: "News",
      path: "/news",
      icon: "far fa-newspaper",
    },
    {
      title: "Settings",
      path: "/settings",
      icon: "fas fa-cogs",
    },
  ];

  return (
    <aside className="col-2 col-md-3">
      <div className="nav-menu d-flex">
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
