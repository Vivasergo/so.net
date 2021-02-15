import React, { FC } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavMenuContainerPropsType } from "./NavMenuContainer";


const NavMenu:FC<NavMenuContainerPropsType> = (props) => {
	const [isClickedBurger, setIsClickedBurger] = useState(false);

	const handleClickBurgerMenu = () => {
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
		navMenu = navMenu.filter((item) => item.title !== "Profile");
	} else {
		navMenu = navMenu.filter((item) => item.title !== "My profile");
	}

	return (
		<aside className="col-2 col-md-3">
			<div
				className={
					isClickedBurger ? "nav-menu d-flex active" : "nav-menu d-flex"
				}
			>
				<nav
					className={
						isClickedBurger
							? "nav-block d-md-block w-100 active"
							: "nav-block d-md-block w-100 not-active"
					}
				>
					<ul className="nav-block__menu w-100">
						{navMenu.map((list) => {
							return (
								<li key={list.title} className="nav-block__list w-100">
									<NavLink
										className={"w-100 d-inline-block"}
										onClick={handleClickBurgerMenu}
										to={list.path}
									>
										<i className={list.icon}></i>
										<span className="nav-block__item">{list.title}</span>
									</NavLink>
								</li>
							);
						})}
					</ul>
					{props.isLogged && (
						<div className="text-center m-2">
							<button
								className={"btn btn-danger m-auto"}
								onClick={() => props.errorGenerate()}
							>
								Generate an error to test
							</button>
						</div>
					)}
				</nav>
				<div
					onClick={handleClickBurgerMenu}
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
