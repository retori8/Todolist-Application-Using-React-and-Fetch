import React from "react";

export default function ButtonClearAll() {
  return (
    <div id="clear">
    <button type="button" className="btn btn-outline-light btn-lg"  onClick={() => {props.deleteAll(list)}}>
      CLEAR ALL
    </button>
    </div>
  )
};
