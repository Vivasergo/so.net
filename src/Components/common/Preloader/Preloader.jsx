import React from "react";
import preloaderSrc from "./loading_apple.gif"


let Preloader = (props) => {
  return (
    <div>
      <img className={"preloader"} src={preloaderSrc} alt="Loading..."  />
    </div>
  );
};

export default Preloader;