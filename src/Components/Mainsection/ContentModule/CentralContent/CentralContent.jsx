import React, {Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import LoginContainer from "../../../Pages/Login/LoginContainer";
import ProfileContainer from "../../../Pages/Profile/ProfileContainer";
import UsersContainer from "../../../Pages/Users/UsersContainer";
import Search from "../../../Pages/Search/Search";
import UnderConstruction from "../../../common/Errors/UnderConstruction";
import Register from "../../../Pages/Registration/Register";

//Lazy loading
const MessagesContainer = React.lazy(() => import("../../../Pages/Messages/MessagesContainer"));

const CentralContent = () => {
    return (
        <>
            <div className="col-12 col-md-8 pr-md-0 main-cont-col">
                <Switch>
                    <Route path="/users">
                        <UsersContainer/>
                    </Route>
                    <Route path="/profile/:userId?">
                        {" "}
                        <ProfileContainer/>
                    </Route>
                    <Route path="/messages">
                        {" "}
                        <Suspense fallback={<div>Загрузка...</div>}>
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
                </Switch>
            </div>
        </>
    );
};

export default CentralContent;
