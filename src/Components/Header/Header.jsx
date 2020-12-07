import React from "react";
import AuthBlockContainer from "./AuthBlock/AuthBlockContainer";
import Logo from "./Logo/Logo";
import SearchBlock from "./SearchBlock/SearchBlock";

const Header = () => {
  return (
    <header className="header pr-2">
      <div className="d-flex justify-content-around">
        <div className="d-none d-lg-block"></div>
        <Logo />
        <SearchBlock />
        <AuthBlockContainer />
      </div>
    </header>
  );
};

export default Header;
