import React from "react";

function TitleHeader({ text }) {
  return <div className="text-xl text-secondary font-semibold">
    <center>
      {text} 
    </center>
    </div>;
}

export default TitleHeader;
