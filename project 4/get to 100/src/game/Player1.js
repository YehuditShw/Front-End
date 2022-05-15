import React from 'react';
import ButtonsSteps1 from './ButtonsSteps1';
import LastScore from './LastScores';

function Player1(props){
  
    let users=props.details.map((user,i) => {return(<div key = {i}><p>name: {user.name}</p><h3>{user.number}</h3><p>steps: {user.steps}</p> <p>scores: {user.scores[user.scores.length -1]}</p>
    < ButtonsSteps1 player={i} action={props.action} user_={user} out= {props.out} newGame ={props.newGame} sup={props.sup}/>
     <LastScore status={props.details[i].status} scores={props.details[i].scores} />
    <hr />
    </div> )})
 
    return(

        <div>
         {users}
        </div>
    )
}
export default Player1;

