import React from "react";
import CentralContent from "./ContentModule/CentralContent/CentralContent";
import RightContent from "./ContentModule/RightContent/RightContent";
import NavMenuContainer from "./NavMenu/NavMenuContainer";

const Mainsection = () => {
  return (
    <>
      <div className="central-block">
        <div className="content-fluid content-block">
          <div className="row">
            <NavMenuContainer />
            <div className="col-10 col-md-9 row content-module">
              <CentralContent />
              <RightContent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainsection;
