import React from "react";

const InitialPage = () => {

    return (
        <div>
            <h3 className={"fw-bold"}>Greetings my potential employers and partners!</h3>
            <p className={"my-2 fs-4"}>I'm glad to introduce my practical React/Redux sample project of social network -
                "So.net"</p>

            <div className={"mt-3"}>
                <h5 className={"text-center"}>Tech stack and basic methods and practices:</h5>
                <ol>
                    <li>JavaScript React library:
                        <ul>
                            <li>Create React App</li>
                            <li>Class components (containers) with lifecycle methods</li>
                            <li>Functional components with hooks</li>
                            <li>App initialization functionality</li>
                            <li>Custom HOCs</li>
                            <li>Custom hooks</li>
                            <li>Lazy loading (suspense)</li>
                            <li>FLUX architecture</li>
                            <li>Preloader functionality</li>
                            <li>Conditional render</li>
                        </ul>
                    </li>
                    <li>Redux - state management library:
                        <ul>
                            <li>Connect method</li>
                            <li>Dispatch, reducers, action creators, action types</li>
                            <li>Compose</li>
                            <li>Deep copy</li>
                            <li>ApplyMiddleware</li>
                        </ul>
                    </li>
                    <li>JavaScript ECMAScript 6</li>
                    <li>Git (GitHub)</li>
                    <li>SASS</li>
                    <li>NPM</li>
                    <li>Additional libraries and approaches:
                        <ul>
                            <li>Reselect library</li>
                            <li>Material UI library</li>
                            <li>Testing-library</li>
                            <li>Axios</li>
                            <li>React-router-dom (WithRouter, Route, Switch)</li>
                            <li>Bootstrap 5</li>
                            <li>React-redux</li>
                            <li>Redux-form</li>
                            <li>Redux-thunk (async, await)</li>
                            <li>CSS modules</li>
                            <li>Separation of UI(React), BLL(Business Logic Layer) and DAL(Data Access Layer - server queries,
                                Promises, REST API)
                            </li>
                            <li>Font awesome</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div>
                Front end developer,<br/>
                Serhii Vasilikhin<br/>
                <a href="mailto:vivasergo@gmail.com">Send me a mail</a>
            </div>
        </div>
    )
}

export default InitialPage;