import { useState, useEffect } from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Todos() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState('serial');
  const [information, setInformation] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${user.id}`)
      .then(response => response.json()
        .then((data) => {
          setInformation(data)
        }))
      .catch(() => { console.log("error") })
  }, [user.id])
  const serial = () => {
    let data = information;
    data.sort((a, b) => (a.id < b.id) ? -1 : 1);
    setInformation(data);
  }
  const alphaBeit = () => {
    let data = information;
    data.sort((a, b) => (a.title < b.title) ? -1 : 1);
    setInformation(data);
  }
  const complete = () => {
    let data = information;
    data.sort((a) => (a.completed) ? -1 : 1);
    setInformation(data)
  }
  const random = () => {
    let data = information;
    data.sort(() => (Math.random() > .5) ? -1 : 1);
    setInformation(data)
  }
  const handleOnChange = (e) => {
    setSelect(e.target.value);
    switch (e.target.value) {
      case "alphaBeit":
        alphaBeit();
        break;
      case "complete":
        complete();
        break;
      case "random":
        random();
        break;
      default:
        serial();
        break;
    }
  }
  return (
    <div>
      <div>
        <FormControl className={classes.formControl}>
          <Typography variant="outlined" component="h2" gutterBottom>sort by </Typography>
          <Select id="demo-controlled-open-select" open={open} onClose={handleClose} onOpen={handleOpen} value={select} onChange={(e) => handleOnChange(e)}>
            <MenuItem value="serial">serial</MenuItem>
            <MenuItem value="alphaBeit">alphaBeit</MenuItem>
            <MenuItem value="complete">complete</MenuItem>
            <MenuItem value="random">random</MenuItem>
          </Select>
        </FormControl>
      </div>
      <List dense className={classes.root}>
        {information && (information.map(value => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} button>
              <ListItemIcon>
                <AttachmentOutlinedIcon color="secondary" />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.title} />
              <ListItemSecondaryAction>
                <Checkbox checked={value.completed} name="checkedB" color="primary" />
              </ListItemSecondaryAction>
            </ListItem>
          );
        }))}
      </List>
    </div>
  );
}