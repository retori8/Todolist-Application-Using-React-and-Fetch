import React from "react";

export default function Card(props){
    return(
        <div id="container" className="card col-6 p-3 ">
            <div className="card-body ">
                <h5 id="title" className="card-title text-center text-white fs-1">
                    TO DO LIST 
                </h5>
                {props.children}
            </div>
        </div>
    )
};