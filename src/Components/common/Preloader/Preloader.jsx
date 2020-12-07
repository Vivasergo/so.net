import React from "react";
import preloaderSrc from "./loading_apple.gif"


let Preloader = (props) => {
  return (
    <div>
      <img style={{position: "fixed", left: "45%", top:"40%", opacity: "0.6", width:"200px"}} src={preloaderSrc} alt="Loading..."  />
    </div>
  );
};

export default Preloader;