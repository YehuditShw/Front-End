import { React, useState, useEffect } from 'react'
import Photo from "./Photo";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined';
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


export default function Albums() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState(null)
  let { url } = useRouteMatch();
  const classes = useStyles();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums/?userId=${user.id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        data.sort((a, b) => a.title < b.title ? -1 : 1)
        setAlbums(data);
      }).catch(() => { console.log("error") });;
  }, [user]);
  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path={`${url}`}>
          <List component="nav" aria-label="main mailbox folders">
            <Grid container spacing={3}>
              {albums && albums.map(album => {
                return (
                  <Grid item xs={4}>
                    <Paper className={classes.paper}>
                      <ListItem button >
                        <Link onClick={() => { setCurrentAlbum(album) }} to={`/application/albums/${album.id}`}>
                          <ListItemIcon>
                            <PermMediaOutlinedIcon color="secondary" />
                          </ListItemIcon>
                        </Link>
                        <ListItemText primary={album.title} />
                      </ListItem>
                    </Paper>
                  </Grid>
                )
              }
              )}
            </Grid>
          </List>
        </Route>
        <Route path={`${url}`} >
          <Photo album={currentAlbum} url={url} />
        </Route  >
      </Switch>
    </div>

  )
}