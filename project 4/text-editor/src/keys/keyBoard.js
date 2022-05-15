import React from "react"

function KeyBoard(props) {
        const language = props.language;

        const keysButtons = language.map((a, i) => {
            return (<span >
                {a.map((letter, j) => <button className="letter"  key={i * 12 + j} onClick={() => props.change(letter)} > {letter} </button>)}
                <br />
            </span>)
        }
        );

    return (
        <div className="keyBoard">

            { keysButtons}
            <button className="space" onClick={() => props.change(' ')}>space</button>
            <button className="enter"  onClick={() => props.change("<br />")}>enter</button>
            <br />
            <button className="undoLast"  onClick= {props.undo}>undo last</button>
            <button className="delete"  onClick={props.change1}>delete</button>
           
        </div>
    );
}



export default KeyBoard;