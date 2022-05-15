import React from "react"

function Color(props) {
    return (

        <div className="color" >
            <h3>color</h3>
            <input type="color" onInput={event=>props.change("color",event.target.value)}></input>
        </div>

    );
}

export default Color;