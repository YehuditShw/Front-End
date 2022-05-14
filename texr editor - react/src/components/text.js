import React from "react"

 function Text(props){
   console.log(props.text);
    let myText = props.text.map((letter,i)=><span key = {i} className="mytext" style = {{color:letter.color, fontSize: letter.size}}>{letter.value==="<br />"?<br />:letter.value}</span>);

     return(
       <div  className="text">{myText}</div>

     );
 }

 export default Text;