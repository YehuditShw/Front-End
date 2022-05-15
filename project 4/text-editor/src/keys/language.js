import React from "react"

function Language(props) {
    return (

        <div  className="language">
            <label for="Language"><h3>Language</h3></label>
            <select id="Language" name="Language" size="1" onInput={event => props.change(event.target.value)}>
                <option value="English">English</option>
                <option value="Hebrew">עברית</option>
                <option value="imugi">😃</option>
            </select>
            
        </div>
    );
}

export default Language;