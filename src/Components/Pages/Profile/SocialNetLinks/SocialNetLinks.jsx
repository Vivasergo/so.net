import React from "react";
import {NavLink} from "react-router-dom";

const SocialNetLinks = props => {

    //preparing data received from the server for an appropriate condition to use
    let contacts = Array.from(Object.entries(props.contacts));

    const socialLinkIcons = {
        facebook: <i className="fab fa-facebook"></i>,
        website: <i className="fas fa-globe"></i>,
        vk: <i className="fab fa-vk"></i>,
        github: <i className="fab fa-github"></i>,
        instagram: <i className="fab fa-instagram"></i>,
        twitter: <i className="fab fa-twitter"></i>,
        youtube: <i className="fab fa-youtube"></i>,
        mainLink: <i className="fas fa-external-link-alt"></i>
    }

    return <div className="col-md-5 col-12 profile-container__contacts">
        <ul className="list-group ms-3 me-3">
            {contacts.map(([first, second], index) => {
                return <li key={index}
                            className={second ? "btn btn-outline-warning btn-sm mb-2" : "btn btn-outline-warning btn-sm mb-2 disabled"}>

                            <a className="w-100 h-100 d-block text-danger" href={second || "#"}>
                                <span className={"me-1"}>{socialLinkIcons.[first]}</span>
                                <span className={"d-inline d-lg-inline d-sm-none"}>{first}</span></a>
                        </li>;
            })}
        </ul>
    </div>;
};

export default SocialNetLinks;
