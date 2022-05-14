import React from "react"

function Size(props) {
    return (
        <div className="size">
        <h3>size</h3>
        <input type="number" onInput={event=>props.change("size",parseInt(event.target.value))}></input>
        </div>
    );
}

export default Size;