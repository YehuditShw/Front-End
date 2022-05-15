import React from "react"

 function Special(props){
     return(
        <div className="special" >
            <button onClick = {props.clear}>CLEAR ALL</button>
            <button onClick = {props.low}>LOWER ALL</button>
            <button onClick = {props.up}>UPPER ALL</button>
        </div>

     );
 }

 export default  Special;