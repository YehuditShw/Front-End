import { React, useState} from 'react'
import { Switch, Route} from "react-router-dom";
import Post1 from "./PostComponent/Post1"
import AllPost from './PostComponent/AllPost'

export default function Posts() {
    const [post, setPost] = useState(null);
    return (
        <div>
            <Switch>
                <Route exact path="/application/posts">
                    <AllPost setPost={setPost} />
                </Route>
                <Route path={`/application/posts/`}>
                    <Post1 post={post} />
                </Route>
            </Switch>
        </div>
    )
}