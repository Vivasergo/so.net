import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../../Pages/Login/Login";
import MessagesContainer from "../../../Pages/Messages/MessagesContainer";
import ProfileContainer from "../../../Pages/Profile/ProfileContainer";
import UsersContainer from "../../../Pages/Users/UsersContainer";

const CentralContent = () => {
  return (
    <>
      <div className="col-12 col-md-8 pr-md-0 main-cont-col">
        <Switch>
          <Route path="/users">
            <UsersContainer />
          </Route>
          <Route path="/profile/:userId?">
            {" "}
            <ProfileContainer />
          </Route>
          <Route path="/messages">
            {" "}
            <MessagesContainer />{" "}
          </Route>
          <Route path="/news"></Route>
          <Route path="/settings"></Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default CentralContent;
