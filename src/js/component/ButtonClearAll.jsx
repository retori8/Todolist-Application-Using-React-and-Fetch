import React from "react";

export default function ButtonClearAll(props) {
  return (
    <div id="clear">
    <button id="buttondeleteall" type="button" className="btn btn-light btn-lg"  onClick={() => {props.deleteAll()}}>
      CLEAR ALL
    </button>
    </div>
  )
};
