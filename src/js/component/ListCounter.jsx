import React from "react";

export default function ListCounter({list}){
    return(
        <li className="list-group-item align-items-start">
            <span className="badge bg-secondary rounded-pill">
              {list.length} item{list.length >= 2 ? "s" : ""} left
            </span>
        </li>
    )
};