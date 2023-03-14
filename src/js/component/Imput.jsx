import React from "react";

export default function Input(props){
    return(
        <div id="input" className="form-floating">
          <form onSubmit={props.handleSubmit}>
            <input
              className="form-control"
              type="text"
              onChange={(e) => {props.setText(e.target.value)}}
              value={props.text}
            />
          </form>
        </div>
    )
};