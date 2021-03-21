import React from "react";
import Filler from "./Filler";
import "./style.css";
const ProgressBar = ({ Points }) => {
  return (
    <div className="progress-bar">
      <Filler Points={Points} />
    </div>
  );
};

export default ProgressBar;
