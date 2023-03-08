import React from "react";

export default function Input(props){
    return(
        <div className="form-floating">
          <form onSubmit={props.handleSubmit}>
            <input
              className="form-control"
              type="text"
              onChange={(e) => {props.setTask(e.target.value)}}
              value={props.task}
            />
            <hr />
          </form>
        </div>
    )
};