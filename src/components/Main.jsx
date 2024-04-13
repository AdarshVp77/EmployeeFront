import React from "react";
import Navbar from "./Navbar";
const Mains = (props) => {
  return (
    <div>
      <Navbar />
      {props.child}
    </div>
  );
};

export default Mains;