import React from "react";

export default function List(props){
    return(
        <ul id="lista" className="list-group active">{props.children}</ul>
    )
};