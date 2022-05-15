import { React, useState, useEffect } from 'react'
import {Route,Link,useRouteMatch,} from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Comments from './Comments'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Posts(props) {
    const [contact, setContact] = useState(null);
    let { url } = useRouteMatch();
    useEffect(() => {
        setContact(props.post);
    }, [])
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Link to='/application/posts'>
                        <ListItemIcon>
                            <ArrowBackIosIcon color="secondary" />
                        </ListItemIcon>
                    </Link>
                    <Typography variant="h5" component="h2">
                        {contact && (<div>
                            <h3>{contact.title}</h3>
                            <p>{contact.body}</p>
                        </div>)}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        <ListItem button >
                            <ListItemIcon>
                            <ChatOutlinedIcon color="secondary" />
                            </ListItemIcon>
                            <ListItemText primary={ <Link to={`${url}/${props.post.id}/comments`} style={{ color: "black" }}>  see my comments</Link>} />
                        </ListItem>
                    </Typography>
                </CardContent>
            </Card>
            <Route path={`/application/posts/${props.post.id}/comments`}>
                <Comments postId={props.post.id} />
            </Route>
        </div>
    )
}