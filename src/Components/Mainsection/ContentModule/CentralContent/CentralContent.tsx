import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import UnderConstruction from "../../../common/Errors/UnderConstruction";
import InitialPage from "../../../Pages/InitialPage/InitialPage";
import LoginContainer from "../../../Pages/Login/LoginContainer";
import ProfileContainer from "../../../Pages/Profile/ProfileContainer";
import Register from "../../../Pages/Registration/Register";
import Users from "../../../Pages/Users/Users";

//Lazy loading
//@ts-ignore
const MessagesContainer = React.lazy(() => import("../../../Pages/Messages/MessagesContainer"));

const CentralContent = () => {
    return (
        <>
            <div className="col-12 col-md-8 pr-md-0 main-cont-col">
                <Switch>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route exact path="/">
                        <InitialPage/>
                    </Route>
                    <Route path="/profile/:userId?">
                        {" "}
                        <ProfileContainer/>
                    </Route>
                    <Route path="/messages">
                        {" "}
                        <Suspense fallback={<div>Loading...</div>}>
                            <MessagesContainer/>{" "}
                        </Suspense>
                    </Route>
                    {/*<Route path="/news"/>*/}
                    {/*<Route path="/settings"/>*/}
                    <Route path="/login">
                        <LoginContainer/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/under-construction">
                        <UnderConstruction/>
                    </Route>
                    <Route path="*">
                        <div><h4>Error 404. Sorry, page not found</h4></div>
                    </Route>
                </Switch>
            </div>
        </>
    );
};

export default CentralContent;
