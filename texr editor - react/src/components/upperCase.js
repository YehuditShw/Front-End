import React from "react"

function UpperCase(props) {
    return (

        <div className="upperCase"  >
           
           {props.language==="English"&& (props.status ==="lowerCase"? <button onClick={() => {props.change("upperCase")}} >upperCase</button>:<button onClick={() =>{ props.change("lowerCase")}} > lowerCase</button>) }
        </div>
    );

}

export default UpperCase;