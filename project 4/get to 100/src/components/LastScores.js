
import React from 'react';

function LastScores(props) {
    let stringScores="";
    let length=props.status==="win"?props.scores.length-2:props.scores.length-1;
    for (let index = 0; index < length; index++) {
        stringScores = stringScores +' '+  props.scores[index];
        
    }
   
    return (
       <div>
           <p>your last scores:</p>
           {stringScores}
       </div>
    )
}
export default LastScores;