import React from "react";

export default function ElementsList(props){
    return(
        <li
        id="task"
        className="list-group-item d-flex justify-content-between"
        key={props.i}
        >{props.task.label}
            <button
            id="buttonDelete"
            type="button"
            className="btn-close btn-close-focus-shadow"
            aria-label="Close"
            onClick={() => {props.handleDelete(props.i)}}
            ></button>
        </li>
    )
};