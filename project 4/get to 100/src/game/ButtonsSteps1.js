import React from 'react';

function ButtonsSteps1(props) {
    let button;
    if (props.user_.status !== "win") {
        button = <div>
       
            <button  disabled={props.user_.status==="notTurn"} onClick={() => props.action(props.user_.number-1, props.player)}>-1</button >
            <button  disabled={props.user_.status==="notTurn"} onClick={() => props.action(props.user_.number+1, props.player)}>+1</button>
            <button  disabled={props.user_.status==="notTurn"} onClick={() => props.action(props.user_.number*2, props.player)}>*2</button>
            <button  disabled={props.user_.status==="notTurn"} onClick={() => props.action(props.user_.number/2, props.player)}>/2</button>
            <button  disabled={props.user_.status==="notTurn"} onClick={() => props.sup(props.player)}>?</button>
        </div>
    }
    else {
        button = <div>
            <p class = "win">{props.user_.name} you are win </p>
            <button onClick={() => props.newGame(props.player)}>new game</button>
            <button onClick={() => props.out(props.player)}>log out</button>
        </div>
    }

    return (
       <div>
           {button}
       </div>
    )
}
export default ButtonsSteps1;


