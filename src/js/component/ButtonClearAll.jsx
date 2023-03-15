import React from "react";

export default function ButtonClearAll(props) {
  return (
    <div id="clear">
    <button type="button" className="btn btn-outline-light btn-lg"  onClick={() => {props.deleteAll()}}>
      CLEAR ALL
    </button>
    </div>
  )
};
