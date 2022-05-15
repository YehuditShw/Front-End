import { React, useState, useEffect } from 'react'
import { Link, useRouteMatch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistAddSharpIcon from '@material-ui/icons/PlaylistAddSharp'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Posts(props) {
  const [contact, setContact] = useState(null);
  let { url } = useRouteMatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const classes = useStyles();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${user.id}`)
      .then(response => response.json()
        .then((data) => {
          setContact(data);
        }))
      .catch(() => { console.log("error") })
  }, [])

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Grid container spacing={3}>
          {contact && (contact.map(post => {
            return (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItem button >
                    <Link onClick={() => props.setPost(post)} to={`${url}/${post.id}`}>
                      <ListItemIcon>
                        <PlaylistAddSharpIcon color="secondary" />
                      </ListItemIcon>
                    </Link>
                    <ListItemText primary={post.title} />
                  </ListItem>
                </Paper>
              </Grid>
            )}))}
        </Grid>
      </List>
    </div>
  )
}