import React from "react";

const InitialPage = () => {

    return (
        <div>
            <h3 className={"fw-bold text-center"}>Greetings my potential employers and partners!</h3>
            <p className={"my-4 fs-4"}>I'm glad to introduce my practical React/Redux sample project of social network -
                "So.net". Here I'm trying to implement newest Front-end technologies and the best practices. The same
                time improving
                my knowledge and skill's level. Hope you'll find it interesting and informative.</p>

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
                    <li>JavaScript ECMAScript 6, 2016, 2017 (()=>{}, **, ``, (...args), ...)</li>
                    <li>Git (GitHub)</li>
                    <li>SASS</li>
                    <li>NPM</li>
                    <li>Bash command line</li>
                    <li>Additional libraries, tools and approaches:
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
                            <li>RWD</li>
                            <li>Separation of UI(React), BLL(Business Logic Layer) and DAL(Data Access Layer - server
                                queries,
                                Promises, REST API, <a target="_blank" rel={"noopener noreferrer"}
                                                       href="https://social-network.samuraijs.com/docs#">Server API</a>)
                            </li>
                            <li>Font awesome</li>
                            <li>React-longpressable</li>
                            <li>React Developer Tools - Chrome Extension</li>
                            <li>Redux DevTools - Chrome Extension</li>
                            <li>Debugging</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div>Keep working on unit/integration tests, expanding app functionality according to the newest trends.
            </div>
            <div><a target="_blank" rel={"noopener noreferrer"} href="https://github.com/Vivasergo/so.net">Here</a> you
                can find the source code.
            </div>
            <div className="my-2">
                With a hope for the fruitfull and mutually beneficial cooperation!
            </div>
            <div>
                Front-end developer,<br/>
                Serhii Vasilikhin<br/>
                <a href="mailto:vivasergo@gmail.com">Send me a mail</a><br/>
                <a target="_blank" rel={"noopener noreferrer"} href="https://www.linkedin.com/in/serhii-vasilikhin/">My
                    LinkedIn</a>
                <p>
                    <time>January, 2021</time>
                </p>
            </div>
        </div>
    )
}

export default InitialPage;