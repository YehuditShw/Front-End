import React from 'react';

function Title(props) {
    return (
        <div>
            <h1 id="title">get to 100!!!</h1>
            
            <button  disabled={props.isAble2} onClick={() => props.startGame()}> start game</button>
            <button disabled={props.isAble} onClick={() => props.addUser()}> add user</button>
            <hr></hr>
        </div>
    )
}
export default Title;

