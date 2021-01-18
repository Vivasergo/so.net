import React, {useEffect} from 'react';
import ReactDOM from "react-dom"

function ErrorBlock(props) {
    // const appRoot = document.getElementById("root");
    // const wrapBlock = document.createElement("div");
    // const errorCont = <>
    //     <h3>Sorry</h3>
    //     <h4>Error has occurred</h4>
    //     <div>props.error</div>
    // </>;

    // useEffect(() => {
    //     appRoot.prepend(wrapBlock);
    //
    //     return () => appRoot.removeChild(wrapBlock);
    // })

    // return ReactDOM.createPortal(errorCont, wrapBlock)
// console.log(props.error);
    return <>
        <h3>Sorry</h3>
        <h4>Error has occurred</h4>
        <div>props.error</div>
    </>
}

export default ErrorBlock;