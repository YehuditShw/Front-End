import { React, useState, useEffect } from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from "react-router-dom";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Photo(props) {
  const [album, setAlbum] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${props.album.id}`)
      .then(response => { return response.json() })
      .then(data => {
        let albums = [];
        data.forEach(photo => {
          albums.push({ url: `${photo.thumbnailUrl}`, title: `${photo.title}` })
        });
        setAlbum(albums)
      }
      )
      .catch(() => { console.log("error") })
  }, [props.album])

  return (<div >
    <Link to={`${props.url}`}>
      <ListItemIcon>
        <UndoOutlinedIcon color="secondary" />
      </ListItemIcon>
    </Link>
    <Box my={6} mx={69} >
      <Grid container spacing={3} >
        <Grid item xs={10.5} >
          <Paper className={classes.paper} >
            {album && album.length ?
              <SimpleImageSlider width={625} height={625} images={album} showNavs />
              : <div className={classes.root}>
                <LinearProgress color="secondary" />
              </div>}
          </Paper>
        </Grid>
        <Grid item xs={11}>
          <Paper className={classes.paper} component="h1">{props.album.title}  </Paper>
        </Grid>
      </Grid>
    </Box>
  </div>
  )
}